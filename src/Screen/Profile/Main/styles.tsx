import styled from 'styled-components';
import {View} from 'react-native';
import {Text, Menu, MenuGroup} from '@ui-kitten/components';

interface ShowProps {
  show: boolean;
}

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
  flex: 1;
`;

export const ContentSection = styled(View)<ShowProps>`
  flex: 1;
  min-height: ${props => (props.show ? '500px' : '50px')};
  max-height: 500px;
`;

export const SectionTitleRow = styled(View)`
  width: 100%;
  padding-right: 15px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const SectionTitle = styled(Text)`
  padding: 10px 0;
`;

export const SectionSubTitle = styled(Text)`
  padding: 15px 5px;
`;

export const SectionContent = styled(View)``;

export const ContentText = styled(Text)``;

export const CustomMenu = styled(Menu)<ShowProps>`
  height: ${props => (props.show ? '200px' : 0)};
  opacity: ${props => (props.show ? 1 : 0)};
`;

export const CustomMenuGroup = styled(MenuGroup)<ShowProps>``;
