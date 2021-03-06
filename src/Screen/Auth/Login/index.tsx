import {useMutation} from '@apollo/client';
import {useNavigation} from '@react-navigation/core';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useCallback, useState} from 'react';
import {StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {userValidate} from '../../../graphql/client';
import {LOGIN} from '../../../graphql/mutation/sharedMutation';
import {AuthStackParamList} from '../../../navigators/Auth/AuthStackNavigator';
import {login as typeLogin, loginVariables} from '../../../types/graphql';
import {LoginForm} from './styles';
import {useInputState} from '../../../hooks/useInput';
import {Icon, Text} from '@ui-kitten/components';
import {
  Button,
  Caption,
  CaptionText,
  Screen,
  Input,
  TouchableTextBox,
} from '../../../common/SharedStyles';
import Toast from 'react-native-toast-message';
import Loading from '../../../components/Loading';

type LoginScreenProps = NativeStackNavigationProp<AuthStackParamList, 'Login'>;

const LoginScreen: React.VFC = () => {
  const {navigate} = useNavigation<LoginScreenProps>();
  const emailInput = useInputState();
  const [pwd, setPwd] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const toggelSecureEntry = useCallback(() => {
    setSecureTextEntry(!secureTextEntry);
  }, [secureTextEntry]);

  const renderIcon = useCallback(
    props => {
      return (
        <TouchableWithoutFeedback onPress={toggelSecureEntry}>
          <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
        </TouchableWithoutFeedback>
      );
    },
    [secureTextEntry, toggelSecureEntry]
  );

  const renderCaption = useCallback(() => {
    return (
      <Caption>
        <Icon
          {...{width: 10, height: 10, marginRight: 5}}
          name="alert-circle-outline"
        />
        <CaptionText>μ΅μ 8κΈμ</CaptionText>
      </Caption>
    );
  }, []);

  const [loginMutation, {loading}] = useMutation<typeLogin, loginVariables>(
    LOGIN,
    {
      onCompleted: ({login}) => {
        const {error, success, token} = login;
        if (success && token) {
          userValidate(token);
          navigate('Validate', {token: token});
        } else {
          return (
            <>
              {Toast.show({
                type: 'error',
                text1: `${
                  error === 'Wrong password'
                    ? 'λΉλ°λ²νΈκ° νλ¦½λλ€'
                    : 'μ μ λ₯Ό μ°Ύμ μ μμ΅λλ€'
                }`,
                position: 'bottom',
              })}
            </>
          );
        }
      },
    }
  );

  const handleLogin = useCallback(async () => {
    const regex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    if (emailInput.value.trim() === '') {
      return (
        <>
          {Toast.show({
            type: 'error',
            text1: 'μ¬λ°λ₯Έ μ΄λ©μΌμ μλ ₯ν΄ μ£ΌμΈμ',
            position: 'bottom',
          })}
        </>
      );
    }
    if (!regex.test(emailInput.value)) {
      return (
        <>
          {Toast.show({
            type: 'error',
            text1: 'μ¬λ°λ₯Έ μ΄λ©μΌμ μλ ₯ν΄ μ£ΌμΈμ',
            position: 'bottom',
          })}
        </>
      );
    }
    if (pwd.trim() === '') {
      return (
        <>
          {Toast.show({
            type: 'error',
            text1: 'λΉλ°λ²νΈλ₯Ό μλ ₯ν΄ μ£ΌμΈμ',
            position: 'bottom',
          })}
        </>
      );
    }
    await loginMutation({
      variables: {
        email: emailInput.value,
        password: pwd,
      },
    });
  }, [emailInput.value, loginMutation, pwd]);

  if (loading) {
    return <Loading />;
  }
  return (
    <Screen style={styles.container}>
      <Text>rencontrer</Text>
      <LoginForm>
        <Input
          keyboardType="email-address"
          status="primary"
          {...emailInput}
          label="μ΄λ©μΌ"
        />
        <Input
          value={pwd}
          label="λΉλ°λ²νΈ"
          status="primary"
          accessoryRight={renderIcon}
          secureTextEntry={secureTextEntry}
          onChangeText={val => setPwd(val)}
          caption={renderCaption}
        />
        <Button
          status="primary"
          appearance={loading ? 'outline' : 'filled'}
          onPress={() => {
            handleLogin();
          }}>
          λ‘κ·ΈμΈ
        </Button>
        <TouchableTextBox
          position="flex-end"
          onPress={() => navigate('FindPassword')}>
          <Text status="warning">λΉλ°λ²νΈμ°ΎκΈ°</Text>
        </TouchableTextBox>
        <TouchableTextBox position="center" onPress={() => navigate('SignUp')}>
          <Text status="primary">νμκ°μ</Text>
        </TouchableTextBox>
      </LoginForm>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoginScreen;
