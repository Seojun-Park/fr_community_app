import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {myIdVar} from '../graphql/client';

import MainTabNavigator from './MainTabNavigator';
import {useReactiveVar} from '@apollo/client';
import {isLoggedInVar} from '../graphql/client';
import AuthStackNavigator from './AuthStackNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ChatStackNavigator from './ChatStackNavigator';

export type MainStackParamList = {
  AppMain: undefined;
  Auth: undefined;
  Chat: undefined;
};

const MainStack = createNativeStackNavigator();

const MainStackNavigator = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const preload = async () => {
    const token = await AsyncStorage.getItem('token');
    const id = await AsyncStorage.getItem('id');
    if (token) {
      isLoggedInVar(true);
    }
    if (id) {
      myIdVar(parseInt(id, 10));
    }
  };

  useEffect(() => {
    preload();
  }, []);

  return (
    <MainStack.Navigator screenOptions={{headerShown: false}}>
      {isLoggedIn ? (
        <MainStack.Screen name={'AppMain'} component={MainTabNavigator} />
      ) : (
        <MainStack.Screen name={'Auth'} component={AuthStackNavigator} />
      )}
      <MainStack.Screen name={'Chat'} component={ChatStackNavigator} />
    </MainStack.Navigator>
  );
};

export default MainStackNavigator;
