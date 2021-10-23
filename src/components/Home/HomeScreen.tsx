import React from 'react';
import {Button, Text, View} from 'react-native';
import {logUserOut} from '../../graphql/client';

const HomeScreen: React.VFC = () => {
  return (
    <View>
      <Text>test</Text>
      <Button onPress={() => logUserOut()} title="logout" />
    </View>
  );
};

export default HomeScreen;
