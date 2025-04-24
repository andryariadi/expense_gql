import { gql } from "@apollo/client";

export const GET_AUTHENTICATED_USER = gql`
  query GetAuthenticatedUser {
    authUser {
      _id
      username
      name
      profilePicture
    }
  }
`;

export const GET_USERS = gql`
  query GetUsers {
    users {
      _id
      username
      name
      profilePicture
    }
  }
`;

export const GET_USER = gql`
  query GetUser($userId: ID!) {
    user(userId: $userId) {
      _id
      username
      name
      profilePicture
    }
  }
`;

export const GET_USER_AND_TRANSACTIONS = gql`
  query GetUserAndTransactions($userId: ID!) {
    user(userId: $userId) {
      _id
      username
      name
      profilePicture
      # user relationship to transactions
      transactions {
        _id
        description
        paymentType
        category
        amount
        location
        date
      }
    }
  }
`;
