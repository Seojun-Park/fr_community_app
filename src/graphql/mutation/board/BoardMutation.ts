import {gql} from '@apollo/client';

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

export const DELETE_BOARD = gql`
  mutation deleteBoard($id: Int!) {
    deleteBoard(id: $id) {
      success
      error
    }
  }
`;

export const CREATE_BOARD = gql`
  mutation createBoard($args: CreateBoardInput!) {
    createBoard(args: $args) {
      success
      error
    }
  }
`;

export const EDIT_BOARD = gql`
  mutation editBoard($args: EditBoardInput!) {
    editBoard(args: $args) {
      success
      error
    }
  }
`;
