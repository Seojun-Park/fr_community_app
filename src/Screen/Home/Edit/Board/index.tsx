import React from 'react';
import {Text} from '@ui-kitten/components';
import {Screen} from '../../../../common/SharedStyles';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {BoardStackParamList} from '../../../../navigators/Home/Board/BoardStackNavigation';
import {useNavigation} from '@react-navigation/core';

interface IProps {
  route: {
    params: {
      userId: string;
      category: string;
      postId: string;
    };
  };
}

type EditBoardScreenProps = NativeStackNavigationProp<
  BoardStackParamList,
  'BoardEdit'
>;

const EditBoardScreen: React.FC<IProps> = ({route: {params}}) => {
  const {navigate} = useNavigation<EditBoardScreenProps>();
  const {userId, category, postId} = params;
  return (
    <Screen>
      <Text>edit board</Text>
    </Screen>
  );
};

export default EditBoardScreen;
