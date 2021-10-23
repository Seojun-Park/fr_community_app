import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import MainTabNavigator from './MainTabNavigator';
import {useReactiveVar} from '@apollo/client';
import {isLoggedInVar} from '../graphql/client';
import AuthStackNavigator from './AuthStackNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MainStack = createNativeStackNavigator();

const MainStackNavigator = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const preload = async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      isLoggedInVar(true);
    }
  };

  useEffect(() => {
    preload();
  }, []);

  return (
    <MainStack.Navigator screenOptions={{headerShown: false}}>
      {isLoggedIn ? (
        <MainStack.Screen name={'App Main'} component={MainTabNavigator} />
      ) : (
        <MainStack.Screen name={'Auth'} component={AuthStackNavigator} />
      )}
    </MainStack.Navigator>
  );
};

export default MainStackNavigator;
