import axios from "axios";
import { DocumentNode, print } from "graphql";

interface GraphQLResponse<T> {
  data: T;
}

export async function graphqlAxios<T>(query: string | DocumentNode, variables?: Record<string, unknown>): Promise<T> {
  const queryString = typeof query === "string" ? query : print(query);
  const response = await axios.post<GraphQLResponse<T>>(
    "http://localhost:5000/graphql",
    {
      query: queryString,
      variables,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data.data;
}
