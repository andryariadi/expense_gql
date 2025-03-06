import { gql } from "@apollo/client";

export const GET_AUTHENTICATED_USER = gql`
  query GetAuthenticatedUser {
    users {
      _id
      username
      name
      profilePicture
    }
  }
`;
