import {gql} from '@apollo/client';

export const DM_SUBSCRIPTION = gql`
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
