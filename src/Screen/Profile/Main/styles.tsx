import {Text} from '@ui-kitten/components';
import {ScrollView, View} from 'react-native';
import styled from 'styled-components';

export const Container = styled(View)`
  width: 100%;
  height: 100%;
  justify-content: center;
`;

export const Head = styled(View)`
  height: 150px;
  width: 95%;
  flex-direction: row;
  align-items: center;
  padding: 20px;
`;

export const AvatarBox = styled(View)`
  background-color: #eee;
  border-radius: 10px;
`;

export const UserInfo = styled(View)`
  margin-left: 30px;
`;

export const InfoText = styled(Text)`
  margin: 5px 0;
`;

export const Content = styled(ScrollView)`
  padding: 20px;
`;

export const SectionRow = styled(View)`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;

export const Bottom = styled(View)`
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 50px;
`;
