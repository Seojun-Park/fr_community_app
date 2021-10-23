import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../components/Home/HomeScreen';

const HomeStack = createNativeStackNavigator();

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator screenOptions={{headerShown: false}}>
      <HomeStack.Screen name="App Home" component={HomeScreen} />
    </HomeStack.Navigator>
  );
};

export default HomeStackNavigator;
