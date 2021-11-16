import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../../Screen/Home/Main';
import BoardStackNavigator from './Board/BoardStackNavigation';

export type HomeStackParamList = {
  HomeScreen: {
    userId: string;
    token: string;
  };
  BoardListScreen: {
    userId: string;
    category: string;
  };
  MarketListScreen: {
    userId: string;
    category: string;
  };
  RentListScreen: {
    userId: string;
    category: string;
  };
  RecruitListScreen: {
    userId: string;
    category: string;
  };
  CommunityListScreen: {
    userId: string;
    category: string;
  };
};
interface IProps {
  route: {
    params: {
      id: string;
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
        name="BoardListScreen"
        component={BoardStackNavigator}
        initialParams={{userId: id}}
      />
    </HomeStack.Navigator>
  );
};

export default HomeStackNavigator;
