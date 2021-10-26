import {useReactiveVar} from '@apollo/client';
import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import TopMenuWithGoback from '../../../components/TopMenuWithGoBack';
import {myIdVar} from '../../../graphql/client';

const ChatListScreen = () => {
  const myId = useReactiveVar(myIdVar);
  console.log('id', myId);

  return (
    <SafeAreaView>
      <TopMenuWithGoback id={myId} />
    </SafeAreaView>
  );
};

export default ChatListScreen;
