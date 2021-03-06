import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BoardListScreen from '../../../Screen/Home/List/Board';
import BoardDetailView from '../../../Screen/Home/Details/board';
import BoardWriteScreen from '../../../Screen/Home/Write/Board';
import EditBoardScreen from '../../../Screen/Home/Edit/Board';
import {getBoard_getBoard_data} from '../../../types/graphql';

export type BoardStackParamList = {
  BoardList: {
    userId: string;
    category: string;
    refreshing?: boolean;
  };
  BoardDetail: {
    userId: string;
    postId: string;
    refreshing?: boolean;
  };
  BoardWrite: {
    userId: string;
    category: string;
  };
  BoardEdit: {
    userId: string;
    category: string;
    postId: string;
    data: getBoard_getBoard_data;
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
      <BoardStack.Screen
        name="BoardWrite"
        component={BoardWriteScreen}
        initialParams={{userId, category}}
      />
      <BoardStack.Screen name="BoardEdit" component={EditBoardScreen} />
    </BoardStack.Navigator>
  );
};

export default BoardStackNavigator;
