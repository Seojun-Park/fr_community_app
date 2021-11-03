import styled from 'styled-components';
import {View} from 'react-native';
import {Text} from '@ui-kitten/components';

export const Head = styled(View)`
  width: 100%;
  height: 60px;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;

export const Intro = styled(View)`
  width: 100%;
  padding-bottom: 20px;
`;

export const Content = styled(View)`
  min-height: 100%;
`;

export const ContentSection = styled(View)`
  /* min-height: 200px; */
`;

export const SectionTitle = styled(Text)`
  padding: 10px 0;
`;

export const SectionSubTitle = styled(Text)`
  padding: 15px 5px;
`;

export const SectionContent = styled(View)`
  height: 90%;
`;

export const SectionContentRow = styled(View)`
  padding: 0 5px;
  width: 100%;
  height: 40px;
  border-bottom-width: 1px;
  border-color: rgb(240, 240, 240);
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;

export const ContentText = styled(Text)``;
