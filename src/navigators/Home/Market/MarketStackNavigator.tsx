import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MarketDetailView from '../../../Screen/Home/Details/market';
import MarketListScreen from '../../../Screen/Home/List/Market';
import MarketWriteScreen from '../../../Screen/Home/Write/Market';
import BoardChatDetail from '../../../Screen/Home/Details/chat';

export type MarketStackParamList = {
  MarketList: {
    userId: string;
    category: string;
    refreshing?: boolean;
  };
  MarketWrite: {
    userId: string;
    category: string;
  };
  MarketDetail: {
    userId: string;
    category: string;
    postId: string;
  };
  MarketChatDetail: {
    userId: string;
    partnerId: string;
  };
};

interface IProps {
  route: {
    params: {
      userId: string;
      category: string;
    };
  };
}

const MarketStack = createNativeStackNavigator<MarketStackParamList>();

const MarketStackNavigator: React.FC<IProps> = ({route: {params}}) => {
  const {userId, category} = params;
  return (
    <MarketStack.Navigator screenOptions={{headerShown: false}}>
      <MarketStack.Screen
        name="MarketList"
        component={MarketListScreen}
        initialParams={{userId, category}}
      />
      <MarketStack.Screen name="MarketDetail" component={MarketDetailView} />
      <MarketStack.Screen name="MarketWrite" component={MarketWriteScreen} />
      <MarketStack.Screen name="MarketChatDetail" component={BoardChatDetail} />
    </MarketStack.Navigator>
  );
};

export default MarketStackNavigator;
