import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../Screen/Auth/Login';
import SignUpScreen from '../Screen/Auth/SignUp';
import ValidateScreen from '../Screen/Auth/Validate';
import FindPasswordScreen from '../Screen/Auth/FindPassword';

export type AuthStackParamList = {
  Login: undefined;
  SignUp: undefined;
  FindPassword: undefined;
  Validate: {
    token: string;
  };
};
const AuthStack = createNativeStackNavigator<AuthStackParamList>();

const AuthStackNavigator = () => {
  return (
    <AuthStack.Navigator screenOptions={{headerShown: false}}>
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="SignUp" component={SignUpScreen} />
      <AuthStack.Screen
        name="FindPassword"
        component={FindPasswordScreen}
        options={{
          headerShown: true,
          headerTitle: '비밀번호 찾기',
        }}
      />
      <AuthStack.Screen
        name="Validate"
        component={ValidateScreen}
        options={{headerShown: true, headerTitle: '이메일 인증'}}
      />
    </AuthStack.Navigator>
  );
};

export default AuthStackNavigator;
