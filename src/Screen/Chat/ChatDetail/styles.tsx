import styled from 'styled-components';
import {View} from 'react-native';
import {Layout, Button, List, ListItem} from '@ui-kitten/components';

interface MessageProps {
  me: boolean;
}

export const MessageBox = styled(Layout)``;

export const MessageList = styled(List)`
  height: 90%;
  padding: 10px 20px;
`;

export const InputBox = styled(Layout)`
  width: 100%;
  align-items: center;
`;

export const SendButton = styled(Button)`
  height: 10px;
`;

export const MessageItem = styled(ListItem)<MessageProps>`
  flex: 1;
  max-width: 65%;
  flex-wrap: wrap;
  background-color: ${props => (props.me ? '#dfe2ea' : '#3f64f6')};
`;

export const MessageRow = styled(View)<MessageProps>`
  width: 100%;
  flex: 1;
  flex-direction: row;
  margin-bottom: 15px;
  justify-content: ${props => (props.me ? 'flex-start' : 'flex-end')};
`;
