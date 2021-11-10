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

export const VERIFY_EMAIL = gql`
  mutation verifyEmail($email: String!, $code: String!) {
    verifyEmail(email: $email, code: $code) {
      success
      error
      data {
        id
      }
    }
  }
`;

export const SEND_NEW_CODE = gql`
  mutation sendNewCode($email: String!) {
    sendNewCode(email: $email) {
      success
      error
      data {
        id
      }
    }
  }
`;

export const SEND_NEW_PASSWORD = gql`
  mutation sendNewPassword(
    $email: String!
    $firstName: String!
    $lastName: String!
  ) {
    sendNewPassword(email: $email, firstName: $firstName, lastName: $lastName) {
      success
      error
      data {
        id
      }
    }
  }
`;

export const SEND_DM = gql`
  mutation sendDm($args: CreateDmInput!) {
    sendDm(args: $args) {
      success
      error
      data {
        id
        createdAt
        content
        ReceiverId
        SenderId
      }
    }
  }
`;

export const OUT_CHAT = gql`
  mutation outChat($userId: Int!, $chatId: Int!) {
    outChat(userId: $userId, chatId: $chatId) {
      success
      error
      data {
        id
      }
    }
  }
`;

export const CREATE_REPLY = gql`
  mutation createReply($args: CreateReplyInput!) {
    createReply(args: $args) {
      success
      error
      data {
        id
      }
    }
  }
`;

export const DELETE_REPLY = gql`
  mutation deleteReply($id: Int!) {
    deleteReply(id: $id)
  }
`;

export const TOGGLE_LIKE = gql`
  mutation toggleLike($Id: Int!, $type: String!, $UserId: Int!) {
    toggleLike(Id: $Id, type: $type, UserId: $UserId) {
      success
      error
    }
  }
`;
