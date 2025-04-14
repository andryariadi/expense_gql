"use client";

import { apolloClient } from "@/libs/apolloClient";
// import { ApolloProvider } from "@apollo/client";
import { ApolloNextAppProvider } from "@apollo/experimental-nextjs-app-support";

interface ApolloWrapperProps {
  children: React.ReactNode;
}

// if used apollo/experimental-nextjs-app-support package, use the following code:
export default function ApolloWrapper({ children }: ApolloWrapperProps) {
  return <ApolloNextAppProvider makeClient={apolloClient}>{children}</ApolloNextAppProvider>;
}

// // if used @apollo/client package, use the following code:
// export default function ApolloWrapper({ children }: ApolloWrapperProps) {
//   return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
// }
