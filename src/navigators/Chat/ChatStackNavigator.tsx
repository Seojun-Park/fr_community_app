import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ChatListScreen from '../../Screen/Chat/ChatList';
import ChatDetailScreen from '../../Screen/Chat/ChatDetail';

export type ChatStackParamList = {
  ChatList: {
    userId: string;
  };
  ChatDetail: {
    userId: number;
    chatId: number;
    partnerId: number;
  };
};

interface IProps {
  route: {
    params: {
      id: string;
    };
  };
}

const ChatStack = createNativeStackNavigator<ChatStackParamList>();

const ChatStackNavigator: React.FC<IProps> = ({route: {params}}) => {
  const {id} = params;
  return (
    <ChatStack.Navigator screenOptions={{headerShown: false}}>
      <ChatStack.Screen
        name="ChatList"
        component={ChatListScreen}
        initialParams={{userId: id}}
      />
      <ChatStack.Screen name="ChatDetail" component={ChatDetailScreen} />
    </ChatStack.Navigator>
  );
};

export default ChatStackNavigator;
