import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../../Screen/Home/Main';
import ListStackNavigator from './ListStackNavigation';

export type HomeStackParamList = {
  HomeScreen: {
    userId: number;
    token: string;
  };
  ItemListScreen: {
    userId: number;
    category: string;
  };
};
interface IProps {
  route: {
    params: {
      id: number;
      token: string;
    };
  };
}

const HomeStack = createNativeStackNavigator<HomeStackParamList>();

const HomeStackNavigator: React.FC<IProps> = ({route: {params}}) => {
  const {id, token} = params;
  return (
    <HomeStack.Navigator screenOptions={{headerShown: false}}>
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        initialParams={{userId: id, token}}
      />
      <HomeStack.Screen
        name="ItemListScreen"
        component={ListStackNavigator}
        initialParams={{userId: id}}
      />
    </HomeStack.Navigator>
  );
};

export default HomeStackNavigator;
