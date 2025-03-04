import { ApolloClient, InMemoryCache } from "@apollo/client";

export const apolloClient = new ApolloClient({
  uri: " http://localhost:5000/graphql", // this is the URL of the server
  cache: new InMemoryCache(), // this is the cache
  credentials: "include", // this is to include the credentials in the request headers
});
