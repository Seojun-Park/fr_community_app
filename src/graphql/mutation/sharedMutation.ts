import {gql} from '@apollo/client';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      success
      error
      token
    }
  }
`;

export const SIGN_UP = gql`
  mutation createUser($args: CreateUserInput!) {
    createUser(args: $args) {
      success
      error
      data {
        id
      }
    }
  }
`;
