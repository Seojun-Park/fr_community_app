import styled from 'styled-components';
import {View, ScrollView} from 'react-native';
import {Button} from '@ui-kitten/components';
import {TouchableOpacity} from 'react-native-gesture-handler';

export const Container = styled(ScrollView)`
  width: 100%;
  padding-bottom: 30px;
  padding: 0 15px;
`;

export const Head = styled(View)`
  align-items: center;
`;

export const BoardInfo = styled(View)`
  width: 95%;
  flex-direction: row;
  justify-content: space-between;
`;

export const BoardAction = styled(View)`
  margin: 5px;
  width: 95%;
  flex-direction: row;
  justify-content: flex-end;
`;

export const BoardActionButton = styled(TouchableOpacity)`
  margin: 0 10px;
`;

export const Content = styled(View)`
  padding: 20px;
  min-height: 250px;
  width: 100%;
  background-color: #eee;
`;

export const Like = styled(View)`
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
`;

export const LikeButton = styled(TouchableOpacity)`
  width: 30px;
  height: 30px;
  justify-content: center;
  align-items: center;
  position: relative;
`;

export const ReplySection = styled(View)`
  padding-bottom: 50px;
`;

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
