import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProfileScreen from '../../Screen/Profile/Main';
import PostDetailScreen from '../../Screen/Profile/Post';

export type ProfileStackParamList = {
  ProfileScreen: {
    id: string;
    token: string;
  };
  PostDetail: {
    uesrId: string;
    id: string;
    category: string;
    token: string;
  };
  EditPost: {
    userId: number;
    category: string;
    token: string;
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
      <ProfileStack.Screen
        name="PostDetail"
        component={PostDetailScreen}
        initialParams={{token}}
      />
    </ProfileStack.Navigator>
  );
};

export default ProfileStackNavigator;
