import {useQuery} from '@apollo/client';
import {CommonActions} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/core';
import {Icon, TopNavigation, TopNavigationAction} from '@ui-kitten/components';
import React from 'react';
import {GET_USER} from '../../graphql/query/sharedQuery';
import {getUser as getUserType, getUserVariables} from '../../types/graphql';

interface IProps {
  id: number;
}

const TopMenuWithGoback: React.FC<IProps> = ({id}) => {
  const {dispatch} = useNavigation();
  const {data} = useQuery<getUserType, getUserVariables>(GET_USER, {
    variables: {id},
  });

  const renderBackAction = () => {
    return (
      <TopNavigationAction
        icon={<Icon {...{width: 25, height: 25}} name="arrow-back" />}
        onPress={() =>
          dispatch({
            ...CommonActions.goBack(),
          })
        }
      />
    );
  };

  return (
    <TopNavigation
      alignment="center"
      title={data?.getUser.data?.nickname}
      accessoryLeft={renderBackAction}
    />
  );
};

export default TopMenuWithGoback;
