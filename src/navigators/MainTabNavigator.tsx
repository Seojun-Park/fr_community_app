import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeStackNavigator from './HomeStackNavigator';
import ChatStackNavigator from './ChatStackNavigator';

const MainTab = createBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <MainTab.Navigator>
      <MainTab.Screen name={'Home'} component={HomeStackNavigator} />
      <MainTab.Screen name={'Chat'} component={ChatStackNavigator} />
    </MainTab.Navigator>
  );
};

export default MainTabNavigator;
