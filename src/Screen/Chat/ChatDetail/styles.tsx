import styled from 'styled-components';
import {View} from 'react-native';
import {Layout, Button, List, ListItem} from '@ui-kitten/components';

interface MessageProps {
  me: boolean;
}

export const MessageBox = styled(View)`
  height: 93%;
`;

export const MessageList = styled(List)`
  padding: 10px 20px;
  height: 100%;
  overflow: scroll;
`;

export const InputBox = styled(Layout)`
  width: 100%;
  align-items: center;
`;

export const SendButton = styled(Button)`
  height: 10px;
`;

export const MessageItem = styled(ListItem)<MessageProps>`
  width: 50%;
  height: 40px;
  background-color: ${props => (props.me ? '#dfe2ea' : '#3f64f6')};
  border-radius: 15px;
  border-bottom-left-radius: ${props => (props.me ? '0px' : '15px')};
  border-bottom-right-radius: ${props => (props.me ? '15px' : '0px')};
`;

export const MessageRow = styled(View)<MessageProps>`
  width: 100%;
  flex-direction: row;
  align-items: center;
  margin-bottom: 15px;
  justify-content: ${props => (props.me ? 'flex-start' : 'flex-end')};
`;
