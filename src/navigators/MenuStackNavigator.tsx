import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import MenuMain from '../Screen/Menu/Main';

export type MenuStackParamList = {
  Main: undefined;
};

const MenuStack = createNativeStackNavigator<MenuStackParamList>();

const MenuStackNavigator = () => {
  return (
    <MenuStack.Navigator screenOptions={{headerShown: false}}>
      <MenuStack.Screen name="Main" component={MenuMain} />
    </MenuStack.Navigator>
  );
};

export default MenuStackNavigator;
