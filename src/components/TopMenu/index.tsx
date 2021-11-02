import {useQuery} from '@apollo/client';
import {useNavigation} from '@react-navigation/core';
import {Icon, TopNavigation, TopNavigationAction} from '@ui-kitten/components';
import React, {useCallback} from 'react';
import {GET_USER} from '../../graphql/query/sharedQuery';
import {MainTabParamList} from '../../navigators/MainTabNavigator';
import {getUser as getUserType, getUserVariables} from '../../types/graphql';

interface IProps {
  title: string;
  subtitle?: string;
  id: number;
}

const TopMenu: React.FC<IProps> = ({title, subtitle, id}) => {
  const {navigate} = useNavigation<MainTabParamList>();

  const renderRightActions = useCallback(() => {
    return (
      <React.Fragment>
        <TopNavigationAction
          icon={
            <Icon {...{width: 25, height: 25}} name="message-circle-outline" />
          }
          onPress={() => navigate('Chat')}
        />
      </React.Fragment>
    );
  }, []);

  return (
    <TopNavigation
      alignment="center"
      title={title}
      subtitle={subtitle ? subtitle : undefined}
      accessoryRight={renderRightActions}
    />
  );
};

export default TopMenu;
