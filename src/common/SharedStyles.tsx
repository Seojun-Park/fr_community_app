import styled from 'styled-components/native';
import {
  Input as ImportedInput,
  Button as ImportedButton,
} from '@ui-kitten/components';
import {SafeAreaView} from 'react-native-safe-area-context';

interface CaptionProps {
  captionSize?: string;
  captionColor?: string;
}

interface PositionProps {
  position: string;
}

export const LoadingScreen = styled(SafeAreaView)`
  background-color: white;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const Screen = styled(SafeAreaView)`
  padding-top: 20px;
  background-color: white;
  justify-content: center;
  align-items: center;
`;

export const Input = styled(ImportedInput)`
  margin: 5px 0;
`;

export const Button = styled(ImportedButton)`
  margin: 8px 0;
`;

export const LoadingIndicatorBox = styled.View`
  justify-content: center;
  align-items: center;
`;

export const Caption = styled.View`
  flex-direction: row;
  align-items: center;
  margin: 5px 0;
`;

export const CaptionText = styled.Text<CaptionProps>`
  font-size: ${props => (props.captionSize ? props.captionSize : '12px')};
  font-weight: 400;
  color: ${props => (props.captionColor ? props.captionColor : '#8f9bb3')};
`;

export const TouchableTextBox = styled.TouchableOpacity<PositionProps>`
  height: 30px;
  width: 100%;
  justify-content: center;
  align-items: ${props => props.position};
`;
