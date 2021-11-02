import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const Badge = () => {
  return (
    <View style={styles.badgeContainer}>
      <Text style={styles.badgeText}>N</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badgeContainer: {
    width: 20,
    height: 20,
    borderRadius: 40,
    backgroundColor: '#FF3D71',
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    fontSize: 8,
    color: '#eee',
  },
});

export default Badge;
