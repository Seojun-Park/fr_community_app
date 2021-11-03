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

export const GET_MY_PROFILE = gql`
  query getMyProfile($token: String!) {
    getMyProfile(token: $token) {
      success
      error
      data {
        id
        firstName
        lastName
        email
        nickname
        Meets {
          id
          title
          createdAt
          Likes {
            id
          }
        }
        Rent {
          id
          title
          createdAt
          Likes {
            id
          }
        }
        Board {
          id
          title
          createdAt
          Likes {
            id
          }
        }
        Market {
          id
          title
          createdAt
          Likes {
            id
          }
        }
        Recruits {
          id
          title
          createdAt
          Likes {
            id
          }
        }
        Like {
          Boards {
            id
            title
            createdAt
          }
          Rents {
            id
            title
            createdAt
          }
          Markets {
            id
            title
            createdAt
          }
          Recruits {
            id
            title
            createdAt
          }
          Meets {
            id
            title
            createdAt
          }
        }
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
          ChatId
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
  query getChatMessages($ChatId: Int!, $load: Int!) {
    getChatMessages(ChatId: $ChatId, load: $load) {
      success
      error
      data {
        createdAt
        content
        SenderId
        ReceiverId
        ChatId
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

export const CHECK_CHAT_MEMBER = gql`
  query checkChatMember($chatId: Int!) {
    checkChatMember(chatId: $chatId) {
      success
      error
      data {
        id
        Member1
        Member2
      }
    }
  }
`;
