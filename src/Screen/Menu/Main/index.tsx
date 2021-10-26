import {useReactiveVar} from '@apollo/client';
import React from 'react';
import {SafeAreaView, Text} from 'react-native';
import TopMenu from '../../../components/TopMenu';
import {myIdVar} from '../../../graphql/client';

const MenuMain = () => {
  const myId = useReactiveVar(myIdVar);

  return (
    <SafeAreaView>
      <TopMenu title="Menu" subtitle="menu sub" id={myId} />
      <Text>main view</Text>
    </SafeAreaView>
  );
};

export default MenuMain;
