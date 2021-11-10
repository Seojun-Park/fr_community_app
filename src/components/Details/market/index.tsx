import {ApolloQueryResult} from '@apollo/client';
import React from 'react';
import {View, Text} from 'react-native';
import {
  getMarket,
  getMarketVariables,
  getMarket_getMarket_data,
} from '../../../types/graphql';

interface IProps {
  market: getMarket_getMarket_data;
  refetch: (
    variables?: Partial<getMarketVariables> | undefined
  ) => Promise<ApolloQueryResult<getMarket>> | undefined;
  id: number;
  loading: boolean;
  userId: number;
}

const MarketDetailView: React.FC<IProps> = ({market, refetch, id, loading}) => {
  return (
    <View>
      <Text>MarketDetail</Text>
    </View>
  );
};

export default MarketDetailView;
