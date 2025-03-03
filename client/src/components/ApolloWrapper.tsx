"use client";

import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "@/libs/apolloClient";

interface ApolloWrapperProps {
  children: React.ReactNode;
}

export default function ApolloWrapper({ children }: ApolloWrapperProps) {
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
}
