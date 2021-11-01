import styled from 'styled-components';
import {View} from 'react-native';
import {Layout, Button, List, ListItem, Text} from '@ui-kitten/components';

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
  /* height: 40px; */
  min-height: 40px;
  word-break: break-all;
  word-wrap: break-word;
  background-color: ${props => (props.me ? '#3f64f6' : '#dfe2ea')};
  border-radius: 15px;
  border-bottom-left-radius: ${props => (props.me ? '15px' : '0px')};
  border-bottom-right-radius: ${props => (props.me ? '0px' : '15px')};
`;

export const MessageRow = styled(View)<MessageProps>`
  width: 100%;
  flex-direction: row;
  align-items: center;
  margin-bottom: 15px;
  justify-content: ${props => (props.me ? 'flex-end' : 'flex-start')};
`;

export const MessageText = styled(Text)`
  color: white;
  margin: 0 8px;
`;

export const Section = styled(View)`
  margin-top: 20px;
  border-top-width: 1px;
  border-top-color: '#eee';
`;
