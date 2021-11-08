import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../Screen/Home/Main';

interface IProps {
  route: {
    params: {
      id: number;
    };
  };
}

const HomeStack = createNativeStackNavigator();

const HomeStackNavigator: React.FC<IProps> = ({route: {params}}) => {
  const {id} = params;
  return (
    <HomeStack.Navigator screenOptions={{headerShown: false}}>
      <HomeStack.Screen
        name="App Home"
        component={HomeScreen}
        initialParams={{id}}
      />
    </HomeStack.Navigator>
  );
};

export default HomeStackNavigator;
