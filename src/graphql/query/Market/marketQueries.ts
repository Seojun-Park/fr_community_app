import {gql} from '@apollo/client';

export const GET_MARKET = gql`
  query getMarket($id: Int!) {
    getMarket(id: $id) {
      success
      error
      data {
        id
        title
        content
        UserId
        price
        location
        type
        status
        thumbnail
        createdAt
        updatedAt
        deletedAt
        User {
          id
          nickname
        }
        Images {
          id
          url
        }
        Likes {
          id
        }
      }
    }
  }
`;

export const GET_MARKETS_BY_CATEGORY = gql`
  query getMarketsByCategory($category: String!, $load: Int!) {
    getMarketsByCategory(category: $category, load: $load) {
      success
      error
      data {
        id
        title
        content
        UserId
        price
        location
        type
        status
        thumbnail
        createdAt
        updatedAt
        deletedAt
        User {
          id
          nickname
        }
      }
    }
  }
`;
