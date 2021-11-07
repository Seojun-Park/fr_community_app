import styled from 'styled-components';
import {ScrollView, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

export const Container = styled(ScrollView)`
  height: 100%;
  width: 100%;
`;

export const Intro = styled(View)`
  height: 150px;
  border-width: 1px;
  padding: 0 50px;
  padding-right: 60px;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
`;

export const AvatarBox = styled(TouchableOpacity)`
  height: 70px;
  width: 70px;
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  border-width: 1px;
  border-color: #95a5a6;
`;

export const IntroBox = styled(View)``;

export const Content = styled(View)``;
