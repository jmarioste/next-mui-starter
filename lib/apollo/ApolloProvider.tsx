import { ApolloProvider } from "@apollo/client";
import React from "react";
import { useApollo } from "./apollo-client";

const MyApolloProvider: React.FC = ({ children }) => {
  const client = useApollo();
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default MyApolloProvider;
