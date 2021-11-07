import {Icon} from '@ui-kitten/components';
import React from 'react';
import {StyleSheet} from 'react-native';

interface IProps {
  size: number;
}

const Avatar: React.FC<IProps> = ({size}) => {
  return <Icon style={styles(size).icon} name="person" fill="#95a5a6" />;
};

const styles = (iconSize: any) =>
  StyleSheet.create({
    icon: {
      width: iconSize,
      height: iconSize,
    },
  });

export default Avatar;
