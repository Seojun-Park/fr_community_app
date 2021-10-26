import {gql} from '@apollo/client';

export const DB_SUBSCRIPTION = gql`
  subscription dmSubscription {
    dmSubscription {
      id
      content
      SenderId
      ReceiverId
      ChatId
    }
  }
`;
