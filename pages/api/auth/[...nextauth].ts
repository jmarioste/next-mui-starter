import { NextApiRequest, NextApiResponse } from "next";
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
// import Cookies from "cookies";
import { getApolloClient } from "lib/apollo-client";
import {
  LoginDocument,
  LoginMutation,
  LoginMutationVariables,
} from "_generated/graphql";
import { ApolloError } from "@apollo/client";

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
      // FacebookProvider({
      //   clientId: process.env.FACEBOOK_CLIENT_ID,
      //   clientSecret: process.env.FACEBOOK_CLIENT_SECRET
      // }),
      // GoogleProvider({
      //   clientId: process.env.GOOGLE_CLIENT_ID,
      //   clientSecret: process.env.GOOGLE_CLIENT_SECRET
      // }),
      // LinkedInProvider({
      //   clientId: process.env.LINKEDIN_CLIENT_ID,
      //   clientSecret: process.env.LINKEDIN_CLIENT_SECRET
      // }),
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

            throw new Error(`signIn ${e}`);
          }
        },
      }),
    ],
  });
}
