import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ChatScreen from '../components/Chat/ChatScreen';

const ChatStack = createNativeStackNavigator();

const ChatStackNavigator: React.VFC = () => {
  return (
    <ChatStack.Navigator screenOptions={{headerShown: false}}>
      <ChatStack.Screen name="Chat Main" component={ChatScreen} />
    </ChatStack.Navigator>
  );
};

export default ChatStackNavigator;
