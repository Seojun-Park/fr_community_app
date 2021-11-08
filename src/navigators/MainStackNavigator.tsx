import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import MainTabNavigator from './MainTabNavigator';
import {useReactiveVar} from '@apollo/client';
import {isLoggedInVar} from '../graphql/client';
import AuthStackNavigator from './AuthStackNavigator';

export type MainStackParamList = {
  AppMain: undefined;
  Auth: undefined;
  Chat: undefined;
};

interface IProps {
  id: string | null;
  token: string | null;
}

const MainStack = createNativeStackNavigator();

const MainStackNavigator: React.FC<IProps> = ({id, token}) => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  useEffect(() => {
    if (token) {
      isLoggedInVar(true);
    }
  }, [token]);

  return (
    <MainStack.Navigator screenOptions={{headerShown: false}}>
      {isLoggedIn ? (
        <MainStack.Screen
          name={'AppMain'}
          component={MainTabNavigator}
          initialParams={{id, token}}
        />
      ) : (
        <MainStack.Screen name={'Auth'} component={AuthStackNavigator} />
      )}
    </MainStack.Navigator>
  );
};

export default MainStackNavigator;
