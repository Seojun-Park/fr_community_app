import {ApolloQueryResult, useMutation, useQuery} from '@apollo/client';
import React, {useRef, useState} from 'react';
import {Platform, Text} from 'react-native';
import Toast from 'react-native-toast-message';
import {Screen} from '../../../common/SharedStyles';
import {CREATE_REPLY} from '../../../graphql/mutation/sharedMutation';
import {GET_BOARD} from '../../../graphql/query/sharedQuery';
import {useInputState} from '../../../hooks/useInput';
import {
  createReply as createReplyType,
  createReplyVariables,
  getBoard,
  getBoardsByCategory,
  getBoardsByCategoryVariables,
  getBoardVariables,
} from '../../../types/graphql';
import Loading from '../../Loading';

interface IProps {
  route: {
    params: {
      userId: number;
      postId: number;
    };
  };
}

const BoardDetailView: React.FC<IProps> = ({route: {params}}) => {
  const {postId, userId, refetch} = params;
  const {
    data,
    loading,
    refetch: queryRefetch,
  } = useQuery<getBoard, getBoardVariables>(GET_BOARD, {
    variables: {id: postId},
  });
  const replyInput = useInputState();
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 80 : 0;
  const animation = useRef(null);
  const [showLottie, setShowLotti] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  const [createReplyMutation, {loading: mutationLoading}] = useMutation<
    createReplyType,
    createReplyVariables
  >(CREATE_REPLY, {
    onCompleted: ({createReply}) => {
      const {success, error} = createReply;
      if (success) {
        refetch();

        replyInput.onChangeText('');
      } else {
        console.error(error);
        return (
          <>
            {Toast.show({
              position: 'bottom',
              type: 'error',
              text1: '댓글을 생성 할 수 없습니다',
            })}
          </>
        );
      }
    },
  });

  if (loading) {
    return <Loading />;
  }
  return (
    <Screen>
      <Text>board etaul</Text>
    </Screen>
  );
};

export default BoardDetailView;
