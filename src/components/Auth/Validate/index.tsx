import {useNavigation} from '@react-navigation/core';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {Text} from 'react-native';
import {
  Button,
  Container,
  Input,
  TouchableTextBox,
} from '../../../common/SharedStyles';
import {useInputState} from '../../../hooks/useInput';
import {AuthStackParamList} from '../../../navigators/AuthStackNavigator';
import {Text as ImportedText} from '@ui-kitten/components';
import {VerificationBox} from './styles';

type ValidationScreenProps = NativeStackNavigationProp<
  AuthStackParamList,
  'Validation'
>;

const ValidationScreen = () => {
  const {navigate} = useNavigation<ValidationScreenProps>();
  const codeInput = useInputState('');
  return (
    <Container>
      <Text>validation</Text>
      <VerificationBox>
        <Input
          keyboardType="numeric"
          label="인증번호를 입력해 주세요"
          {...codeInput}
        />
        <TouchableTextBox position="center">
          <ImportedText status="error">
            인증 코드를 받지 못하셨나요?
          </ImportedText>
        </TouchableTextBox>
        <Button status="primary">인증</Button>
      </VerificationBox>
    </Container>
  );
};

export default ValidationScreen;
