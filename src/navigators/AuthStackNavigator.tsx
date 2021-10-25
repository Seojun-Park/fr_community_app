import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../components/Auth/Login';
import SignUpScreen from '../components/Auth/SignUp';
import ValidationScreen from '../components/Auth/Validate';

export type AuthStackParamList = {
  Login: undefined;
  SignUp: undefined;
  Validation: undefined;
};
const AuthStack = createNativeStackNavigator<AuthStackParamList>();

const AuthStackNavigator = () => {
  return (
    <AuthStack.Navigator screenOptions={{headerShown: false}}>
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="SignUp" component={SignUpScreen} />
      <AuthStack.Screen name="Validation" component={ValidationScreen} />
    </AuthStack.Navigator>
  );
};

export default AuthStackNavigator;
