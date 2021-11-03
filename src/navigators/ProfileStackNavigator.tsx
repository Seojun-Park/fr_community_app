import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import ProfileScreen from '../Screen/Profile/Profile';

export type SearchStackParamList = {
  Profile: undefined;
};

const ProfileStack = createNativeStackNavigator<SearchStackParamList>();

const ProfileStackNavigtor = () => {
  return (
    <ProfileStack.Navigator screenOptions={{headerShown: false}}>
      <ProfileStack.Screen name="Profile" component={ProfileScreen} />
    </ProfileStack.Navigator>
  );
};

export default ProfileStackNavigtor;
