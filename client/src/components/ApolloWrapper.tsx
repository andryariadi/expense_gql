"use client";

// import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "@/libs/apolloClient";
import { ApolloNextAppProvider } from "@apollo/experimental-nextjs-app-support";

interface ApolloWrapperProps {
  children: React.ReactNode;
}

export default function ApolloWrapper({ children }: ApolloWrapperProps) {
  return <ApolloNextAppProvider makeClient={apolloClient}>{children}</ApolloNextAppProvider>;
}
