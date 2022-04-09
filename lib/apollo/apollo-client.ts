import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  NormalizedCacheObject,
} from "@apollo/client";
import { useSession } from "next-auth/react";
import { useMemo } from "react";
import { apolloCache } from "./cache";
import { onError } from "@apollo/client/link/error";
import { GraphQLError } from "graphql";
let apolloClient: ApolloClient<NormalizedCacheObject> | undefined;

const httpLink = new HttpLink({
  uri: process.env.API_URL,
  credentials: "include",
});

type ValidationError = {
  property: string;
  constraints: {
    [key: string]: string;
  };
};

const errorLink = onError(({ response, graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    console.log(JSON.stringify(graphQLErrors, null, 4));
    const formatted = graphQLErrors.flatMap((error) => {
      //check if there are validation errors returned by class-validator from backend.
      const validationError = error.extensions.exception
        ?.validationErrors as ValidationError[];
      if (validationError) {
        const validationErrors = validationError.flatMap((e) => {
          const message = Object.values(e.constraints).join(",");
          return new GraphQLError(message);
        });
        return validationErrors;
      }

      //check if error is an internal server error. just show minimal error message to user.
      if (error.extensions.code === "INTERNAL_SERVER_ERROR") {
        console.error(error.message); // log message
        return [new GraphQLError("Internal Server Error")];
      }

      //return the error directly
      return error;
    });
    response.errors = formatted;
  }

  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
    // response.errors = [new GraphQLError("Network error")];
  }
});

const cache = apolloCache;

export function getApolloClient() {
  if (apolloClient) return apolloClient;
  apolloClient = new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: ApolloLink.from([errorLink, httpLink]),
    cache: cache,
  });

  return apolloClient;
}

export function useApollo() {
  const { data: session } = useSession();
  const token = session?.token ?? "";
  const store = useMemo(() => {
    const client = getApolloClient();
    if (token) {
      //if there is a session, we set the apollo link to include token
      const authMiddleware = new ApolloLink((operation, forward) => {
        // add the authorization to the headers
        operation.setContext(({ headers = {} }) => ({
          headers: {
            ...headers,
            authorization: token ? "Bearer " + token : null,
          },
        }));

        return forward(operation);
      });

      client.setLink(ApolloLink.from([errorLink, authMiddleware, httpLink]));
    }
    return client;
  }, [token]);

  return store;
}
