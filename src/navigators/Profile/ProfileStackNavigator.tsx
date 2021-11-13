import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProfileScreen from '../../Screen/Profile/Main';
import PostDetailScreen from '../../Screen/Profile/PostDetail';

export type ProfileStackParamList = {
  ProfileScreen: {
    id: number;
    token: string;
  };
  PostDetail: {
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

const ProfileStack = createNativeStackNavigator<ProfileStackParamList>();

const ProfileStackNavigator: React.FC<IProps> = ({route: {params}}) => {
  const {id, token} = params;
  return (
    <ProfileStack.Navigator screenOptions={{headerShown: false}}>
      <ProfileStack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        initialParams={{id, token}}
      />
      <ProfileStack.Screen name="PostDetail" component={PostDetailScreen} />
    </ProfileStack.Navigator>
  );
};

export default ProfileStackNavigator;
