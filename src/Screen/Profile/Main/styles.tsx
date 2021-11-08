import styled from 'styled-components';
import {ScrollView, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

export const Container = styled(View)`
  height: 100%;
  width: 100%;
`;

export const Intro = styled(View)`
  height: 150px;
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

export const IntroBoxHead = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

export const Content = styled(ScrollView)`
  margin: 20px;
  margin-bottom: 0;
  background-color: white;
`;

export const ContentSection = styled(View)``;

export const SectionHead = styled(View)``;

export const SectionBody = styled(View)``;
