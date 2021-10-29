import {gql} from '@apollo/client';

export const DM_SUBSCRIPTION = gql`
  subscription dmSubscription($ChatId: Int!) {
    dmSubscription(ChatId: $ChatId) {
      id
      content
      SenderId
      ReceiverId
      ChatId
    }
  }
`;

export const MEMBER_OUT = gql`
  subscription memberOut($chatId: Int!) {
    memberOut(chatId: $chatId)
  }
`;
