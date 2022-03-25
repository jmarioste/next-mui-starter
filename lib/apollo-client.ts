import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined;

const httpLink = new HttpLink({
  // Server URL (must be absolute)
  uri: process.env.API_URL,
  // Additional fetch() options like `credentials` or `headers`
  credentials: "include",
});

export function getApolloClient() {
  if (apolloClient) return apolloClient;
  apolloClient = new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: ApolloLink.from([httpLink]),
    cache: new InMemoryCache({}),
  });

  return apolloClient;
}
