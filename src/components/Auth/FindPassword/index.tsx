import {useMutation} from '@apollo/client';
import {useNavigation} from '@react-navigation/core';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useCallback} from 'react';
import {StyleSheet, Text} from 'react-native';
import {Button, Container, Input} from '../../../common/SharedStyles';
import {SEND_NEW_PASSWORD} from '../../../graphql/mutation/sharedMutation';
import {useInputState} from '../../../hooks/useInput';
import {AuthStackParamList} from '../../../navigators/AuthStackNavigator';
import {FindPasswordBox} from './styles';
import {
  sendNewPassword as sendNewPasswordType,
  sendNewPasswordVariables,
} from '../../../types/graphql';
import Toast from 'react-native-toast-message';
import LoadingIndicator from '../../LoadingIndicator';

type FindPasswordScreenProps = NativeStackNavigationProp<
  AuthStackParamList,
  'FindPassword'
>;

const FindPasswordScreen: React.VFC = () => {
  const {navigate} = useNavigation<FindPasswordScreenProps>();
  const emailInput = useInputState();
  const firstNameInput = useInputState();
  const lastNameInput = useInputState();

  const [sendNewPasswordMutation, {loading}] = useMutation<
    sendNewPasswordType,
    sendNewPasswordVariables
  >(SEND_NEW_PASSWORD, {
    onCompleted: ({sendNewPassword}) => {
      const {success, error} = sendNewPassword;
      if (success) {
        return (
          <>
            {Toast.show({
              type: 'success',
              text1: '새로운 비밀번호가 이메일로 전송 되었습니다',
              position: 'bottom',
            })}
          </>
        );
      } else {
        return (
          <>
            {Toast.show({
              type: 'error',
              text1: `${error}`,
              position: 'bottom',
            })}
          </>
        );
      }
    },
  });
  const handleSubmit = useCallback(() => {
    sendNewPasswordMutation({
      variables: {
        email: emailInput.value,
        firstName: firstNameInput.value,
        lastName: lastNameInput.value,
      },
    })
      .then(() => {
        return (
          <>
            {Toast.show({
              type: 'success',
              text1: '새로운 비밀번호가 이메일로 전송 되었습니다',
              position: 'bottom',
            })}
          </>
        );
      })
      .finally(() => navigate('Login'));
  }, [
    emailInput.value,
    firstNameInput.value,
    lastNameInput.value,
    sendNewPasswordMutation,
    navigate,
  ]);

  return (
    <Container>
      <FindPasswordBox>
        <Input status="primary" {...emailInput} label="이메일" />
        <Input status="primary" {...lastNameInput} label="성" />
        <Input status="primary" {...firstNameInput} label="이름" />
        <Button
          style={styles.buttonbox}
          status="primary"
          onPress={() => handleSubmit()}
          accessoryLeft={
            loading ? <LoadingIndicator size="small" /> : undefined
          }
          appearance={loading ? 'outline' : 'filled'}>
          찾기
        </Button>
      </FindPasswordBox>
    </Container>
  );
};

const styles = StyleSheet.create({
  buttonbox: {
    marginTop: 30,
  },
});

export default FindPasswordScreen;
