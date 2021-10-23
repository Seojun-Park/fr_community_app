import {gql} from '@apollo/client';

export const GET_USERS = gql`
  query getUsers {
    getUsers {
      success
      error
      data {
        id
        firstName
        lastName
      }
    }
  }
`;

export const GET_USER = gql`
  query getUser($id: Int!) {
    getUser(id: $id) {
      success
      error
      data {
        id
        firstName
        lastName
        nickname
      }
    }
  }
`;
