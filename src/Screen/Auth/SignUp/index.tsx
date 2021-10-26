import {useMutation} from '@apollo/client';
import {useNavigation} from '@react-navigation/core';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Icon, Text as ImportedText} from '@ui-kitten/components';
import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableWithoutFeedback} from 'react-native';
import {Button, Container, Input} from '../../../common/SharedStyles';
import {useInputState} from '../../../hooks/useInput';
import {AuthStackParamList} from '../../../navigators/AuthStackNavigator';
import {SignUpForm} from './styles';
import {SIGN_UP} from '../../../graphql/mutation/sharedMutation';
import LoadingIndicator from '../../../components/LoadingIndicator';
import {renderCaption} from '../../../hooks/useCaption';
import {TouchableText} from '../Login/styles';
import Toast from 'react-native-toast-message';
import {createUser, createUserVariables} from '../../../types/graphql';

type LoginScreenProps = NativeStackNavigationProp<AuthStackParamList, 'SignUp'>;

const SignUpScreen: React.VFC = () => {
  const {navigate} = useNavigation<LoginScreenProps>();
  const [pwd, setPwd] = useState('');
  const [pwdCheck, setPwdCheck] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [checkSecureTextEntry, setCheckSecureTextEntry] = useState(true);
  const [pwdMatch, setPwdMatch] = useState(false);

  const emailInput = useInputState();
  const firstNameInput = useInputState();
  const lastNameInput = useInputState();
  const nicknameInput = useInputState();

  const [signUpMutation, {loading}] = useMutation<
    createUser,
    createUserVariables
  >(SIGN_UP, {
    onCompleted: ({createUser: result}) => {
      const {success, error} = result;
      if (success) {
        setTimeout(() => navigate('Login'), 500);
        return Toast.show({
          type: 'success',
          text1: '생성완료 로그인 창으로 이동합니다',
          position: 'bottom',
        });
      } else if (error) {
        return Toast.show({
          type: 'error',
          text1: '유저를 생성 할 수 없습니다',
          position: 'bottom',
        });
      }
    },
  });

  const toggleSecureEntry = useCallback(() => {
    setSecureTextEntry(!secureTextEntry);
  }, [secureTextEntry]);

  const toggleCheckSecureEntry = useCallback(() => {
    setCheckSecureTextEntry(!checkSecureTextEntry);
  }, [checkSecureTextEntry]);

  const renderIcon = useCallback(
    props => {
      return (
        <TouchableWithoutFeedback onPress={toggleSecureEntry}>
          <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
        </TouchableWithoutFeedback>
      );
    },
    [secureTextEntry, toggleSecureEntry],
  );

  const renderCheckIcon = useCallback(
    props => {
      return (
        <TouchableWithoutFeedback onPress={toggleCheckSecureEntry}>
          <Icon {...props} name={checkSecureTextEntry ? 'eye-off' : 'eye'} />
        </TouchableWithoutFeedback>
      );
    },
    [checkSecureTextEntry, toggleCheckSecureEntry],
  );

  const handleSignUp = useCallback(() => {
    const regex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
    if (!regex.test(pwd)) {
      return (
        <>
          {Toast.show({
            type: 'error',
            text1: '숫자, 글자, 특수문자가 포함된 8글자 이상',
            position: 'bottom',
          })}
        </>
      );
    }
    if (!pwdMatch) {
      return (
        <>
          {Toast.show({
            type: 'error',
            text1: '비밀번호가 일치 하지 않습니다',
            position: 'bottom',
          })}
        </>
      );
    }
    signUpMutation({
      variables: {
        args: {
          email: emailInput.value,
          firstName: firstNameInput.value,
          lastName: lastNameInput.value,
          password: pwd,
          nickname: nicknameInput.value,
        },
      },
    })
      .then(() => {
        return (
          <>
            {Toast.show({
              type: 'info',
              text1: '회원가입 완료! 이메일 인증번호가 전송되었습니다',
              text2: ' 로그인 후 인증 해 주세요',
              position: 'bottom',
            })}
          </>
        );
      })
      .finally(() => navigate('Login'));
  }, [
    signUpMutation,
    emailInput.value,
    firstNameInput.value,
    lastNameInput.value,
    pwd,
    nicknameInput.value,
    pwdMatch,
    navigate,
  ]);

  useEffect(() => {
    if (pwd === pwdCheck) {
      setPwdMatch(true);
    } else {
      setPwdMatch(false);
    }
  }, [pwd, pwdCheck, setPwdMatch]);

  return (
    <Container>
      <Text>signup</Text>
      <SignUpForm>
        <Input
          keyboardType="email-address"
          status="primary"
          {...emailInput}
          label="이메일"
        />
        <Input
          value={pwd}
          label="비밀번호"
          status="primary"
          placeholder="숫자, 글자,특수문자가 포함된 8글자 이상"
          accessoryRight={renderIcon}
          secureTextEntry={secureTextEntry}
          onChangeText={val => setPwd(val)}
        />
        <Input
          value={pwdCheck}
          label="비밀번호 확인"
          status={pwdMatch ? 'primary' : 'danger'}
          accessoryRight={renderCheckIcon}
          secureTextEntry={checkSecureTextEntry}
          onChangeText={val => setPwdCheck(val)}
          caption={
            pwdMatch
              ? undefined
              : renderCaption({
                  caption: '비밀번호가 일치 하지 않습니다',
                  color: '#ca3e68',
                  size: undefined,
                })
          }
        />
        <Input status="primary" {...firstNameInput} label="이름" />
        <Input status="primary" {...lastNameInput} label="성" />
        <Input status="primary" {...nicknameInput} label="유저네임" />
        <Button
          style={styles.button}
          status="primary"
          accessoryLeft={
            loading ? <LoadingIndicator size="small" /> : undefined
          }
          appearance={loading ? 'outline' : 'filled'}
          onPress={() => handleSignUp()}>
          회원가입
        </Button>
        <TouchableText position="flex-start" onPress={() => navigate('Login')}>
          <ImportedText status="primary">로그인 창으로 돌아가기</ImportedText>
        </TouchableText>
      </SignUpForm>
    </Container>
  );
};

const styles = StyleSheet.create({
  button: {
    marginBottom: 30,
  },
});

export default SignUpScreen;
