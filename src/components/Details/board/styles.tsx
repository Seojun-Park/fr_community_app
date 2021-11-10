import styled from 'styled-components';
import {View, ScrollView} from 'react-native';
import {Button} from '@ui-kitten/components';

export const Container = styled(ScrollView)`
  padding: 0 20px;
`;

export const Head = styled(View)``;

export const BoardInfo = styled(View)`
  margin: 10px;
  width: 90%;
  flex-direction: row;
  justify-content: space-between;
`;

export const Content = styled(View)`
  padding: 20px;
  min-height: 250px;
  width: 100%;
  background-color: #eee;
`;

export const ReplySection = styled(View)``;

export const ReplyContent = styled(View)`
  padding: 10px 0;
  width: 100%;
`;

export const ReplyRow = styled(View)`
  flex-direction: row;
  margin: 2px 0;
  padding: 3px;
  width: 75%;
  align-items: center;
`;

export const SendButton = styled(Button)`
  padding: 2px 0;
`;
