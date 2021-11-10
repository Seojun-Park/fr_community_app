import {ApolloQueryResult} from '@apollo/client';
import React from 'react';
import {View, Text} from 'react-native';
import {
  getRent,
  getRentVariables,
  getRent_getRent_data,
} from '../../../types/graphql';

interface IProps {
  rent: getRent_getRent_data | undefined | null;
  refetch: (
    variables?: Partial<getRentVariables> | undefined
  ) => Promise<ApolloQueryResult<getRent>> | undefined;
  id: number;
  loading: boolean;
  userId: number;
}

const RentDetailView: React.FC<IProps> = ({rent, refetch, id, loading}) => {
  return (
    <View>
      <Text>RentDetail</Text>
    </View>
  );
};

export default RentDetailView;
