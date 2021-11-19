import {gql} from '@apollo/client';

export const GET_BOARD = gql`
  query getBoard($id: Int!) {
    getBoard(id: $id) {
      success
      error
      data {
        id
        title
        content
        category
        WriterId
        Writer {
          id
          nickname
        }
        Replies {
          id
          content
          User {
            id
            nickname
          }
        }
        Likes {
          id
          OwnerId
        }
        createdAt
      }
    }
  }
`;

export const GET_BOARDS_BY_CATEGORY = gql`
  query getBoardsByCategory($category: String!, $loadQuantity: Int!) {
    getBoardsByCategory(category: $category, loadQuantity: $loadQuantity) {
      success
      error
      data {
        id
        title
        createdAt
      }
    }
  }
`;
