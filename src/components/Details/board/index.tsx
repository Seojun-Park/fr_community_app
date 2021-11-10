import {ApolloQueryResult, useMutation} from '@apollo/client';
import {Divider, Icon, Text} from '@ui-kitten/components';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import {getDate} from '../../../common/getDate';
import {Input, LoadingScreen} from '../../../common/SharedStyles';
import {
  CREATE_REPLY,
  DELETE_REPLY,
  TOGGLE_LIKE,
} from '../../../graphql/mutation/sharedMutation';
import {useInputState} from '../../../hooks/useInput';
import {
  getBoard,
  getBoardVariables,
  getBoard_getBoard_data,
  createReply,
  createReplyVariables,
  deleteReply,
  deleteReplyVariables,
  toggleLike as toggleLikeType,
  toggleLikeVariables,
} from '../../../types/graphql';
import {
  BoardInfo,
  Container,
  Content,
  Head,
  Like,
  LikeButton,
  ReplyContent,
  ReplyRow,
  ReplySection,
  SendButton,
} from './styles';
import LottieView from 'lottie-react-native';

interface IProps {
  board: getBoard_getBoard_data;
  refetch: (
    variables?: Partial<getBoardVariables> | undefined
  ) => Promise<ApolloQueryResult<getBoard>> | undefined;
  id: number;
  loading: boolean;
  userId: number;
}

const BoardDetailView: React.FC<IProps> = ({
  board,
  refetch,
  id,
  loading,
  userId,
}) => {
  const replyInput = useInputState();
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 80 : 0;
  const animation = useRef(null);
  const [showLottie, setShowLotti] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  const [createReplyMutation, {loading: mutationLoading}] = useMutation<
    createReply,
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

  const [deleteReplyMutation] = useMutation<deleteReply, deleteReplyVariables>(
    DELETE_REPLY,
    {
      onCompleted: ({deleteReply}) => {
        if (deleteReply) {
          refetch();
          return (
            <>
              {Toast.show({
                position: 'bottom',
                type: 'success',
                text1: '댓글이 삭제 되었습니다',
              })}
            </>
          );
        }
      },
    }
  );

  const [toggleLikeMutation] = useMutation<toggleLikeType, toggleLikeVariables>(
    TOGGLE_LIKE,
    {
      variables: {
        type: 'board',
        Id: id,
        UserId: userId,
      },
      onCompleted: ({toggleLike}) => {
        const {success, error} = toggleLike;
        if (success) {
          refetch();
          setShowLotti(!showLottie);
        } else {
          console.error(error);
          return (
            <>
              {Toast.show({
                type: 'error',
                text1: '게시물을 저장할 수 없습니다',
              })}
            </>
          );
        }
      },
    }
  );

  console.log(board);

  useEffect(() => {
    if (board.Likes) {
      setLikesCount(board.Likes.length);
    }
  }, [board.Likes]);

  useEffect(() => {
    if (board.Likes?.findIndex(v => v.OwnerId === userId) === 0) {
      setShowLotti(true);
      animation.current.play(0, 29);
    }
  }, [board.Likes, userId]);

  console.log(board.Likes?.findIndex(v => v.OwnerId === userId));

  const onPress = useCallback(() => {
    toggleLikeMutation();
    if (!showLottie) {
      animation.current.play(0, 29);
    }
  }, [toggleLikeMutation]);

  const handleReplySubmit = useCallback(async () => {
    await createReplyMutation({
      variables: {
        args: {
          UserId: userId,
          BoardId: id,
          content: replyInput.value,
        },
      },
    });
  }, [userId, id, replyInput.value, createReplyMutation]);

  const renderInputButton = useCallback(() => {
    return (
      <SendButton
        status="primary"
        disabled={mutationLoading ? true : false}
        onPress={handleReplySubmit}>
        올리기
      </SendButton>
    );
  }, [mutationLoading, handleReplySubmit]);

  return (
    <Container
      refreshControl={
        <RefreshControl refreshing={false} onRefresh={() => refetch()} />
      }>
      <KeyboardAvoidingView
        behavior="position"
        keyboardVerticalOffset={keyboardVerticalOffset}>
        <Head>
          <Text category="h5">{board.title}</Text>
          <Divider style={styles.dividerMargin} />
          <BoardInfo>
            <TouchableOpacity>
              <Text category="s1">{board.Writer.nickname}</Text>
            </TouchableOpacity>
            <Text category="s1" appearance="hint">
              {getDate(board.createdAt)}
            </Text>
          </BoardInfo>
        </Head>
        <Divider style={styles.dividerMargin} />
        <Content>
          <Text category="p1">{board.content}</Text>
        </Content>
        <Like>
          <LikeButton onPress={onPress}>
            {!showLottie && (
              <Icon {...styles.icon} name="heart-outline" fill="black" />
            )}
            <LottieView
              source={require('../../../asset/lotties/heart.json')}
              ref={animation}
              loop={false}
              style={{width: 80, height: 80}}
            />
          </LikeButton>
          <Text category="s2" appearance="hint">
            {likesCount}
          </Text>
          {/* <Button onPress={onPress} title="like" /> */}
        </Like>
        <Divider style={styles.dividerMargin} />
        <ReplySection>
          <ReplyContent>
            {board.Replies &&
              board.Replies.map((rep, idx) => {
                return (
                  <ReplyRow key={idx}>
                    <TouchableOpacity activeOpacity={0.5}>
                      <Text style={styles.replUserName}>
                        {rep.User.nickname}
                        {board.Writer.id === rep.User.id && (
                          <Icon
                            {...{width: 8, height: 8}}
                            fill="red"
                            name="star"
                          />
                        )}
                      </Text>
                    </TouchableOpacity>
                    <Text>{rep.content}</Text>
                    <TouchableOpacity
                      style={styles.repleAction}
                      onPress={() => {
                        deleteReplyMutation({
                          variables: {
                            id: rep.id,
                          },
                        });
                      }}>
                      {userId === rep.User.id && (
                        <Icon
                          {...{width: 14, height: 14}}
                          fill="red"
                          name="trash-2-outline"
                        />
                      )}
                    </TouchableOpacity>
                  </ReplyRow>
                );
              })}
          </ReplyContent>
          {loading && (
            <LoadingScreen>
              <Text>loading...</Text>
            </LoadingScreen>
          )}
          <Divider style={styles.dividerMargin} />
          <Input
            {...replyInput}
            status="primary"
            placeholder="답글 달기"
            accessoryRight={renderInputButton}
          />
        </ReplySection>
      </KeyboardAvoidingView>
    </Container>
  );
};

const styles = StyleSheet.create({
  dividerMargin: {
    marginTop: 15,
    marginBottom: 15,
  },
  replUserName: {
    marginRight: 15,
  },
  repleAction: {
    marginLeft: 10,
  },
  icon: {
    position: 'absolute',
    width: 23,
    height: 23,
    top: 27.5,
    left: -11.5,
  },
});

export default BoardDetailView;
