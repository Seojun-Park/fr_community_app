import {ApolloQueryResult, useMutation} from '@apollo/client';
import {Divider, Icon, Text} from '@ui-kitten/components';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import {getDate} from '../../../../../common/getDate';
import Loading from '../../../../../components/Loading';
import {
  CREATE_REPLY,
  DELETE_BOARD,
  DELETE_REPLY,
  TOGGLE_LIKE,
} from '../../../../../graphql/mutation/sharedMutation';
import {useInputState} from '../../../../../hooks/useInput';
import {
  createReplyVariables,
  deleteBoard as deleteBoardType,
  deleteBoardVariables,
  getBoard,
  getBoardVariables,
  getBoard_getBoard_data,
  createReply as createReplyType,
  deleteReplyVariables,
  deleteReply as deleteReplyType,
  toggleLike as toggleLikeType,
  toggleLikeVariables,
} from '../../../../../types/graphql';
import {
  BoardAction,
  BoardActionButton,
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
} from '../styles';
import LottieView from 'lottie-react-native';
import {Input} from '../../../../../common/SharedStyles';

interface IProps {
  data: getBoard_getBoard_data;
  loading: boolean;
  userId: number;
  token: string;
  navigate: any;
  refetch: (
    variables?: Partial<getBoardVariables> | undefined
  ) => Promise<ApolloQueryResult<getBoard>>;
}

const ProfileBoardDetail: React.FC<IProps> = ({
  data,
  loading,
  userId,
  token,
  navigate,
  refetch,
}) => {
  const replyInput = useInputState();
  const keyboardVerticalOffet = Platform.OS === 'ios' ? 80 : 0;
  const [showLottie, setShowLotti] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  const [deleteBoardMutation] = useMutation<
    deleteBoardType,
    deleteBoardVariables
  >(DELETE_BOARD, {
    variables: {
      id: data.id,
    },
    onCompleted: ({deleteBoard}) => {
      const {success, error} = deleteBoard;
      if (success) {
        navigate('ProfileScreen', {
          token,
          id: userId,
        });
        return (
          <>
            {Toast.show({
              type: 'success',
              position: 'bottom',
              text1: '게시물이 삭제 되었습니다',
            })}
          </>
        );
      } else {
        console.log(error);
      }
    },
  });

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

  const [deleteReplyMutation] = useMutation<
    deleteReplyType,
    deleteReplyVariables
  >(DELETE_REPLY, {
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
  });

  const [toggleLikeMutation] = useMutation<toggleLikeType, toggleLikeVariables>(
    TOGGLE_LIKE,
    {
      variables: {
        type: 'board',
        Id: data.id,
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

  const handleReplySubmit = useCallback(async () => {
    await createReplyMutation({
      variables: {
        args: {
          UserId: userId,
          BoardId: data.id,
          content: replyInput.value,
        },
      },
    });
  }, [userId, replyInput.value, createReplyMutation, data.id]);

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

  const onPress = useCallback(() => {
    toggleLikeMutation();
    setShowLotti(!showLottie);
  }, [toggleLikeMutation, showLottie]);

  useEffect(() => {
    if (data.Likes) {
      setLikesCount(data.Likes.length);
      if (data.Likes.findIndex(v => v.OwnerId === userId) === 0) {
        setShowLotti(true);
      }
    }
  }, [data.Likes, userId]);

  if (loading) {
    return <Loading />;
  }
  return (
    <View style={styles.screen}>
      <Container
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={() => refetch()} />
        }>
        <KeyboardAvoidingView
          behavior="position"
          keyboardVerticalOffset={keyboardVerticalOffet}>
          <Head>
            <Text category="h5">{data.title}</Text>
            <Divider style={styles.dividerMargin} />
            <BoardInfo>
              <TouchableOpacity>
                <Text category="s1" appearance="hint">
                  {data.Writer.nickname}
                </Text>
              </TouchableOpacity>
              <Text category="s1" appearance="hint">
                {getDate(data.createdAt)}
              </Text>
            </BoardInfo>
            {userId === data.WriterId && (
              <BoardAction>
                <BoardActionButton>
                  <Text category={'s2'} style={styles.editActionTextColor}>
                    수정하기
                  </Text>
                </BoardActionButton>
                <BoardActionButton onPress={() => deleteBoardMutation()}>
                  <Text category={'s2'} style={styles.deleteActionTextColor}>
                    삭제하기
                  </Text>
                </BoardActionButton>
              </BoardAction>
            )}
          </Head>
          <Divider style={styles.dividerMargin} />
          <Content>
            <Text category={'p1'}>{data.content}</Text>
          </Content>
          <Like>
            <LikeButton onPress={onPress}>
              {!showLottie ? (
                <Icon
                  {...{width: 24, height: 24}}
                  name={'heart-outline'}
                  fill="black"
                />
              ) : (
                <Icon {...{width: 24, height: 24}} name={'heart'} fill="red" />
              )}
            </LikeButton>
            <Text category={'s2'} appearance="hint">
              {likesCount}
            </Text>
          </Like>
          <Divider style={styles.dividerMargin} />
          <ReplySection>
            <ReplyContent>
              {data.Replies?.map((rep, idx) => {
                return (
                  <ReplyRow key={idx}>
                    <TouchableOpacity activeOpacity={0.5}>
                      <Text appearance="hint" style={styles.replUserName}>
                        {rep.User.nickname}
                        {data.WriterId === rep.User.id && (
                          <Icon
                            {...{width: 8, height: 8}}
                            name="star"
                            fill="red"
                          />
                        )}
                      </Text>
                    </TouchableOpacity>
                    <Text>{rep.content}</Text>
                    {userId === rep.User.id && (
                      <TouchableOpacity
                        style={styles.repleAction}
                        onPress={() => {
                          deleteReplyMutation({
                            variables: {
                              id: rep.id,
                            },
                          });
                        }}>
                        <Icon
                          {...{width: 14, height: 14}}
                          fill="red"
                          name="trash-2-outline"
                        />
                      </TouchableOpacity>
                    )}
                  </ReplyRow>
                );
              })}
            </ReplyContent>
            {loading && <Loading />}
            <Divider style={styles.dividerMargin} />
            <Input
              status="primary"
              placeholder="댓글달기"
              {...replyInput}
              accessoryRight={renderInputButton}
            />
          </ReplySection>
        </KeyboardAvoidingView>
      </Container>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    width: '100%',
    backgroundColor: 'white',
    alignItems: 'center',
  },
  dividerMargin: {
    marginTop: 20,
    marginBottom: 20,
  },
  deleteActionTextColor: {
    color: '#ec1c42',
  },
  editActionTextColor: {
    color: '#2b58f9',
  },
  replUserName: {
    marginRight: 15,
  },
  repleAction: {
    marginLeft: 10,
  },
});

export default ProfileBoardDetail;
