import {RadioGroup} from '@ui-kitten/components';
import {View} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import styled from 'styled-components';

interface ImageButton {
  height: string;
  width: string;
}

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

export const OptionGroup = styled(RadioGroup)`
  flex-direction: row;
`;

export const ImageRow = styled(ScrollView)`
  padding: 10px;
  flex-direction: row;
`;

export const ImageBox = styled(View)`
  position: relative;
`;

export const ImageUploadButton = styled(TouchableOpacity)<ImageButton>`
  height: ${props => props.height};
  width: ${props => props.width};
  align-items: center;
  justify-content: center;
  border-width: 1px;
  border-color: #bdc3c7;
  background-color: #ecf0f1;
  border-style: dashed;
`;

export const ImageDeleteButton = styled(TouchableOpacity)`
  height: 35px;
  width: 35px;
  right: 45px;
  bottom: 75px;
  border-radius: 20px;
  background-color: #ff3d71;
  align-items: center;
  justify-content: center;
`;
