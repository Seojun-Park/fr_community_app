import {ApolloQueryResult} from '@apollo/client';
import React from 'react';
import {View, Text} from 'react-native';
import {
  getRecruit,
  getRecruitVariables,
  getRent_getRent_data,
} from '../../../../types/graphql';

interface IProps {
  recruit: getRent_getRent_data;
  refetch: (
    variables?: Partial<getRecruitVariables> | undefined
  ) => Promise<ApolloQueryResult<getRecruit>> | undefined;
  id: number;
  loading: boolean;
  userId: number;
}

const RecruitDetailView: React.FC<IProps> = () => {
  return (
    <View>
      <Text>RecruitDetail</Text>
    </View>
  );
};

export default RecruitDetailView;
