import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BoardListScreen from '../../../Screen/Home/List/Board';
import BoardDetailView from '../../../components/Details/board';
import {
  getBoardsByCategory,
  getBoardsByCategoryVariables,
} from '../../../types/graphql';
import {ApolloQueryResult} from '@apollo/client';

export type BoardStackParamList = {
  BoardList: {
    userId: number;
    category: string;
  };
  BoardDetail: {
    userId: number;
    postId: number;
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

const BoardStack = createNativeStackNavigator<BoardStackParamList>();

const BoardStackNavigator: React.FC<IProps> = ({route: {params}}) => {
  const {userId, category} = params;

  return (
    <BoardStack.Navigator screenOptions={{headerShown: false}}>
      <BoardStack.Screen
        name="BoardList"
        component={BoardListScreen}
        initialParams={{userId, category}}
      />
      <BoardStack.Screen name="BoardDetail" component={BoardDetailView} />
    </BoardStack.Navigator>
  );
};

export default BoardStackNavigator;
