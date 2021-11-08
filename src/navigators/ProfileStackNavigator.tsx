import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import ProfileScreen from '../Screen/Profile/Main';

export type SearchStackParamList = {
  Profile: {
    id: number;
    token: string;
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

const ProfileStack = createNativeStackNavigator<SearchStackParamList>();

const ProfileStackNavigtor: React.FC<IProps> = ({route: {params}}) => {
  const {id, token} = params;
  return (
    <ProfileStack.Navigator screenOptions={{headerShown: false}}>
      <ProfileStack.Screen
        name="Profile"
        component={ProfileScreen}
        initialParams={{id, token}}
      />
    </ProfileStack.Navigator>
  );
};

export default ProfileStackNavigtor;
