import {useReactiveVar} from '@apollo/client';
import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text} from 'react-native';
import TopMenu from '../../../components/TopMenu';
import {myIdVar} from '../../../graphql/client';

const SearchScreen: React.VFC = () => {
  const myId = useReactiveVar(myIdVar);
  return (
    <SafeAreaView>
      <TopMenu title="Search" subtitle="subtitle" id={myId} />
      <ScrollView style={styles.scroll}>
        <Text>search</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scroll: {
    height: '100%',
  },
});

export default SearchScreen;
