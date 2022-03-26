import { NextApiRequest, NextApiResponse } from "next";
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import jwt from "jsonwebtoken";
import { getApolloClient } from "lib/apollo/apollo-client";
import { ApolloError } from "@apollo/client";
import {
  LoginMutation,
  LoginMutationVariables,
  LoginDocument,
} from "graphql/user.generated";

if (!process.env.SECRET) {
  throw new Error("please provide process.env.SECRET environment variable");
}

export default async function hanlder(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // const cookie = new Cookies(req, res);
  // let ip = (req.headers["x-real-ip"] as string) || req.socket.remoteAddress;

  // if (process.env.APP_ENV !== "production" && cookie.get("test-ip")) {
  //   ip = cookie.get("test-ip");
  // }

  return await NextAuth(req, res, {
    providers: [
      //TODO: Create signIn mutation
      CredentialsProvider({
        name: "Credentials",
        id: "credentials",
        credentials: {
          email: { label: "Email", type: "text", placeholder: "jsmith" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials, req) {
          try {
            const client = getApolloClient();
            const { data } = await client.mutate<
              LoginMutation,
              LoginMutationVariables
            >({
              mutation: LoginDocument,
              variables: {
                input: {
                  email: credentials.email,
                  password: credentials.password,
                },
              },
            });
            const user = data?.signin;

            return {
              ...user,
            };
          } catch (e) {
            if (e instanceof ApolloError) {
              if (e.networkError) {
                throw new Error("Internal Server error");
              }
              throw new Error(e.message);
            }

            throw new Error(`${e.message}`);
          }
        },
      }),
    ],
    secret: process.env.SECRET,
    session: {
      strategy: "jwt",
    },

    jwt: {
      secret: process.env.SECRET,
    },

    pages: {
      signIn: "/signin",
    },
    callbacks: {
      session: async ({ session, token, user }) => {
        console.log("inside session");
        if (session.user) {
          const secret = process.env.SECRET;
          const access_token = jwt.sign(
            { email: token.email ?? user.email },
            secret,
            {
              algorithm: "HS256",
            }
          );
          session.token = access_token;
        }

        return session;
      },
    },
  });
}
