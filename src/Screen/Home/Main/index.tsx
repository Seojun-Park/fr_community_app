import {useReactiveVar} from '@apollo/client';
import React from 'react';
import {Button, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import TopMenu from '../../../components/TopMenu';
import {logUserOut, myIdVar} from '../../../graphql/client';

const HomeScreen: React.VFC = () => {
  const myId = useReactiveVar(myIdVar);

  return (
    <SafeAreaView>
      <TopMenu title="home" subtitle="sub home" id={myId} />
      <Text>test</Text>
      <Button onPress={() => logUserOut()} title="logout" />
    </SafeAreaView>
  );
};

export default HomeScreen;
