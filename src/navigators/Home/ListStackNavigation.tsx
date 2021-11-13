import React, {useCallback} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ListScreen from '../../Screen/Home/List';
import {useLazyQuery, useQuery} from '@apollo/client';
import {
  getBoardsByCategory,
  getBoardsByCategoryVariables,
} from '../../types/graphql';
import {GET_BOARDS_BY_CATEGORY} from '../../graphql/query/sharedQuery';
import {LoadingScreen} from '../../common/SharedStyles';
import LottieView from 'lottie-react-native';

export type ListStackParamList = {
  ListScreen: {
    userId: number;
    category: string;
  };
};

interface IProps {
  route: {
    params: {
      userId: number;
      category: string;
    };
  };
}

const ListStack = createNativeStackNavigator<ListStackParamList>();

const ListStackNavigator: React.FC<IProps> = ({route: {params}}) => {
  const {userId, category} = params;
  const [getNotices, {loading, refetch: noticeRefetch}] = useLazyQuery<
    getBoardsByCategory,
    getBoardsByCategoryVariables
  >(GET_BOARDS_BY_CATEGORY, {
    fetchPolicy: 'cache-and-network',
    variables: {category},
  });

  const handleGetQuery = useCallback(async () => {
    switch (category) {
      case 'notice':
        await getNotices();
        break;
    }
  }, [category]);

  if (loading) {
    return (
      <LoadingScreen>
        <LottieView
          source={require('../../asset/lotties/loading.json')}
          autoPlay
          loop
          style={{width: 150, height: 150}}
        />
        <LottieView
          source={require('../../asset/lotties/loading-text.json')}
          autoPlay
          loop
          style={{width: 40, height: 40}}
        />
      </LoadingScreen>
    );
  }

  return (
    <ListStack.Navigator screenOptions={{headerShown: false}}>
      <ListStack.Screen
        name="ListScreen"
        component={ListScreen}
        initialParams={{userId, category}}
      />
    </ListStack.Navigator>
  );
};

export default ListStackNavigator;
