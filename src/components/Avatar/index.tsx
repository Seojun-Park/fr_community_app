import {Text} from '@ui-kitten/components';
import React from 'react';
import {StyleSheet} from 'react-native';
import {AvatarContainer} from './styles';

interface IProps {
  nickname: string;
}

const Avatar: React.FC<IProps> = ({nickname}) => {
  return (
    <AvatarContainer size={'40px'}>
      <Text style={styles.font} category="c2">
        {nickname.split('')[0]}
      </Text>
    </AvatarContainer>
  );
};

const styles = StyleSheet.create({
  font: {
    fontSize: 12,
  },
});

export default Avatar;
