import React, {useEffect} from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import MainTabNavigator from './MainTabNavigator';
import {useReactiveVar} from '@apollo/client';
import {isLoggedInVar} from '../../graphql/client';
import AuthStackNavigator from '../Auth/AuthStackNavigator';
import {useNavigation} from '@react-navigation/core';

export type MainStackParamList = {
  AppMain: {
    id: string | null | undefined;
    token: string | null;
  };
  Auth: undefined;
};

interface IProps {
  id: string | null;
  token: string | null;
}

type MainStackScreenProps = NativeStackNavigationProp<
  MainStackParamList,
  'AppMain'
>;

const MainStack = createNativeStackNavigator<MainStackParamList>();

const MainStackNavigator: React.FC<IProps> = ({id, token}) => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const {navigate} = useNavigation<MainStackScreenProps>();
  useEffect(() => {
    if (token) {
      isLoggedInVar(true);
      navigate('AppMain', {id, token});
    }
  }, [token, navigate, id]);

  return (
    <MainStack.Navigator screenOptions={{headerShown: false}}>
      <MainStack.Screen name={'Auth'} component={AuthStackNavigator} />
      <MainStack.Screen
        name={'AppMain'}
        component={MainTabNavigator}
        initialParams={{id, token}}
      />

      {/* {isLoggedIn ? (
        <MainStack.Screen
          name={'AppMain'}
          component={MainTabNavigator}
          initialParams={{id, token}}
        />
      ) : (
        <MainStack.Screen name={'Auth'} component={AuthStackNavigator} />
      )} */}
    </MainStack.Navigator>
  );
};

export default MainStackNavigator;
