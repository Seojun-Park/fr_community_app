import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ChatListScreen from '../../Screen/Chat/ChatList';
import ChatDetailScreen from '../../Screen/Chat/ChatDetail';

export type ChatStackParamList = {
  ChatList: undefined;
  ChatDetail: undefined;
};

const ChatStack = createNativeStackNavigator<ChatStackParamList>();

const ChatStackNavigator = () => {
  return (
    <ChatStack.Navigator screenOptions={{headerShown: false}}>
      <ChatStack.Screen name="ChatList" component={ChatListScreen} />
      <ChatStack.Screen name="ChatDetail" component={ChatDetailScreen} />
    </ChatStack.Navigator>
  );
};

export default ChatStackNavigator;
