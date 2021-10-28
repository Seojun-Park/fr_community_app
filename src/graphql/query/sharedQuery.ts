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

export const GET_ME = gql`
  query getMe($token: String!) {
    getMe(token: $token) {
      success
      error
      data {
        id
        verified
        verifiedCode
        email
      }
    }
  }
`;

export const GET_CHATS = gql`
  query getChats($userId: Int!) {
    getChats(userId: $userId) {
      success
      error
      data {
        id
        messages {
          id
          content
          SenderId
          ReceiverId
          createdAt
        }
        Members {
          id
          nickname
        }
      }
    }
  }
`;

export const GET_CHAT = gql`
  query getChat($chatId: Int!) {
    getChat(chatId: $chatId) {
      success
      error
      data {
        messages {
          createdAt
          content
          SenderId
          ReceiverId
          Sender {
            id
            nickname
          }
          Receiver {
            id
            nickname
          }
        }
        Members {
          id
          nickname
        }
      }
    }
  }
`;

export const GET_CHAT_MESSAGE = gql`
  query getChatMessages($ChatId: Int!) {
    getChatMessages(ChatId: $ChatId) {
      success
      error
      data {
        createdAt
        content
        SenderId
        ReceiverId
        Sender {
          id
          nickname
        }
        Receiver {
          id
          nickname
        }
      }
    }
  }
`;
