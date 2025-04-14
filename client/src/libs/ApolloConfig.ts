import { HttpLink } from "@apollo/client";
import { registerApolloClient, ApolloClient, InMemoryCache } from "@apollo/experimental-nextjs-app-support";
import { headers } from "next/headers";

export const { getClient, query, PreloadQuery } = registerApolloClient(async () => {
  const headersList = await headers();
  const cookie = headersList.get("cookie");

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: "http://localhost:5000/graphql",
      // you can disable result caching here if you want to
      // (this does not work if you are rendering your page with `export const dynamic = "force-static"`)
      // fetchOptions: { cache: "no-store" },
      credentials: "include",
      headers: {
        cookie: cookie || "", // include the cookie in the headers
      },
    }),
    credentials: "include",
  });
});
