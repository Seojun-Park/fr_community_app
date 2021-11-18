import {ApolloQueryResult} from '@apollo/client';
import React from 'react';
import {View, Text} from 'react-native';
import {
  getMeet,
  getMeetVariables,
  getMeet_getMeet_data,
} from '../../../../types/graphql';

interface IProps {
  meet: getMeet_getMeet_data;
  refetch: (
    variables?: Partial<getMeetVariables> | undefined
  ) => Promise<ApolloQueryResult<getMeet>> | undefined;
  id: number;
  loading: boolean;
  userId: number;
}

const MeetDetailView: React.FC<IProps> = ({meet, refetch, id, loading}) => {
  return (
    <View>
      <Text>meetDetail</Text>
    </View>
  );
};

export default MeetDetailView;
