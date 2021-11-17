import {View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import styled from 'styled-components';

export const Content = styled(ScrollView)`
  width: 90%;
  height: 100%;
`;

export const TitleBox = styled(View)`
  margin-bottom: 20px;
`;

export const InputGroup = styled(View)`
  margin-bottom: 50px;
`;

export const InputRow = styled(View)`
  padding: 5px 0;
`;
