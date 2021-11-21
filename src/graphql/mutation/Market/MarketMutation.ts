import {gql} from '@apollo/client';

export const CREATE_MARKET = gql`
  mutation createMarket($args: CreateMarketInput!) {
    createMarket(args: $args) {
      success
      error
    }
  }
`;
