import {useMutation} from '@apollo/client';
import {useNavigation} from '@react-navigation/core';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useCallback, useState} from 'react';
import {TouchableWithoutFeedback} from 'react-native';
import {logUserIn} from '../../../graphql/client';
import {LOGIN} from '../../../graphql/mutation/sharedMutation';
import {AuthStackParamList} from '../../../navigators/AuthStackNavigator';
import {login as typeLogin, loginVariables} from '../../../types/graphql';
import {LoginForm} from './styles';
import {useInputState} from '../../../hooks/useInput';
import {Icon, Text} from '@ui-kitten/components';
import {
  Button,
  Caption,
  CaptionText,
  Container,
  Input,
  TouchableTextBox,
} from '../../../common/SharedStyles';
import LoadingIndicator from '../../LoadingIndicator';
import Toast from 'react-native-toast-message';

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
    [secureTextEntry, toggelSecureEntry],
  );

  const renderCaption = useCallback(() => {
    return (
      <Caption>
        <Icon
          {...{width: 10, height: 10, marginRight: 5}}
          name="alert-circle-outline"
        />
        <CaptionText>최소 8글자</CaptionText>
      </Caption>
    );
  }, []);

  const [loginMutation, {loading}] = useMutation<typeLogin, loginVariables>(
    LOGIN,
    {
      onCompleted: ({login}) => {
        const {success, error, token} = login;
        console.log(token);
        if (success && token) {
          logUserIn(token);
        } else {
          return Toast.show({
            type: 'error',
            text1:
              error === 'Wrong password'
                ? '비밀번호가 틀립니다'
                : '유저를 찾을 수 없습니다',
            position: 'bottom',
          });
        }
      },
    },
  );

  const handleLogin = useCallback(async () => {
    await loginMutation({
      variables: {
        email: emailInput.value,
        password: pwd,
      },
    });
  }, [emailInput.value, loginMutation, pwd]);

  return (
    <Container>
      <Text>login</Text>
      <LoginForm>
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
          accessoryRight={renderIcon}
          secureTextEntry={secureTextEntry}
          onChangeText={val => setPwd(val)}
          caption={renderCaption}
        />
        <Button
          status="primary"
          accessoryLeft={
            loading ? <LoadingIndicator size="small" /> : undefined
          }
          appearance={loading ? 'outline' : 'filled'}
          onPress={() => handleLogin()}>
          로그인
        </Button>
        <TouchableTextBox position="flex-end">
          <Text status="warning">비밀번호찾기</Text>
        </TouchableTextBox>
        <TouchableTextBox position="center" onPress={() => navigate('SignUp')}>
          <Text status="primary">회원가입</Text>
        </TouchableTextBox>
      </LoginForm>
    </Container>
  );
};

export default LoginScreen;
