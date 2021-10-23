import {useMutation} from '@apollo/client';
import {useNavigation} from '@react-navigation/core';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {AuthButton, TouchableText} from '../../../common/SharedStyles';
import {logUserIn} from '../../../graphql/client';
import {LOGIN} from '../../../graphql/mutation/sharedMutation';
import {AuthStackParamList} from '../../../navigators/AuthStackNavigator';
import {login as typeLogin, loginVariables} from '../../../types/graphql';
import {Container, Input, Touchable} from './styles';

type LoginScreenProps = NativeStackNavigationProp<AuthStackParamList, 'Login'>;

const LoginScreen: React.VFC = () => {
  const {navigate} = useNavigation<LoginScreenProps>();
  const [loginMutation] = useMutation<typeLogin, loginVariables>(LOGIN, {
    onCompleted: ({login}) => {
      const {success, error, data} = login;
      if (success && typeof data === 'string') {
        logUserIn(data);
      } else {
        console.error(error);
      }
    },
  });

  return (
    <Container>
      <Input placeholder="email" />
      <Input placeholder="password" keyboardType="numeric" />
      <AuthButton
        color="#3c40c6"
        onPress={() =>
          loginMutation({
            variables: {
              email: 'jinchul112@gmail.com',
              password: '1234',
            },
          })
        }
        title={'Login'}
      />
      <Touchable onPress={() => navigate('SignUp')}>
        <TouchableText>Sign up</TouchableText>
      </Touchable>
    </Container>
  );
};

export default LoginScreen;
