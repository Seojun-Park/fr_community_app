import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {Screen} from '../../../common/SharedStyles';
import {Icon, TopNavigation, TopNavigationAction} from '@ui-kitten/components';
import {useNavigation} from '@react-navigation/core';

interface IProps {
  route: {
    params: {
      userId: number;
      category: string;
    };
  };
}

const ListScreen: React.FC<IProps> = ({route: {params}}) => {
  const {goBack} = useNavigation();
  const {userId, category} = params;

  const backAction = () => (
    <TopNavigationAction
      icon={<Icon {...{width: 24, height: 24}} name="arrow-back" />}
      onPress={() => goBack()}
    />
  );

  return (
    <Screen>
      <TopNavigation accessoryLeft={backAction} style={styles.TopNavigation} />
      <Text>list</Text>
    </Screen>
  );
};

const styles = StyleSheet.create({
  TopNavigation: {
    marginTop: 15,
  },
});

export default ListScreen;
