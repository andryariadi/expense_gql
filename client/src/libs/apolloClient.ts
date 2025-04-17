// if you are using the @apollo/client package, you can use the following code:
// import { ApolloClient, InMemoryCache } from "@apollo/client";

// export const apolloClient = new ApolloClient({
//   uri: "http://localhost:5000/graphql", // this is the URL of the server
//   cache: new InMemoryCache(), // this is the cache
//   credentials: "include", // this is to include the credentials in the request headers
// });

// if you are using the experimental-nextjs-app-support package specific to Next.js App Router, you can use the following code:
import { HttpLink } from "@apollo/client";
import { ApolloClient, InMemoryCache } from "@apollo/experimental-nextjs-app-support";

export const apolloClient = () => {
  const httpLink = new HttpLink({
    uri: "http://localhost:5000/graphql",
    // fetchOptions: { cache: "no-store" },
    credentials: "include", // Include credentials in the request headers
  });

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: httpLink,
    credentials: "include", // Include credentials in the request headers
  });
};
