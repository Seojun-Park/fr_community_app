import React from 'react';
import {SafeAreaView, View, Text, StyleSheet} from 'react-native';

const ImagePickerHeader = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.topBar}>
        <Text style={styles.topBarTitleText}>Avatar Picker</Text>
      </View>
    </SafeAreaView>
  );
};

export default ImagePickerHeader;

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#62d1bc',
  },
  topBar: {
    height: 50,
    backgroundColor: '#62d1bc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topBarTitleText: {
    color: '#ffffff',
    fontSize: 20,
  },
});
