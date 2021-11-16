import {useMutation, useQuery} from '@apollo/client';
import {useNavigation} from '@react-navigation/core';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  Divider,
  Icon,
  Text,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {KeyboardAvoidingView, Platform, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import {getDate} from '../../../common/getDate';
import {
  CREATE_REPLY,
  DELETE_REPLY,
  TOGGLE_LIKE,
} from '../../../graphql/mutation/sharedMutation';
import {GET_BOARD} from '../../../graphql/query/sharedQuery';
import {useInputState} from '../../../hooks/useInput';
import {BoardStackParamList} from '../../../navigators/Home/Board/BoardStackNavigation';
import {
  createReply as createReplyType,
  createReplyVariables,
  deleteReply as deleteReplyType,
  deleteReplyVariables,
  getBoard as getBoardtype,
  getBoardVariables,
  toggleLike as toggleLikeType,
  toggleLikeVariables,
} from '../../../types/graphql';
import Loading from '../../Loading';
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
import {SafeAreaView} from 'react-native-safe-area-context';
import {Input, LoadingScreen} from '../../../common/SharedStyles';

interface IProps {
  route: {
    params: {
      userId: string;
      postId: string;
    };
  };
}

type BoardDetailScreenProps = NativeStackNavigationProp<
  BoardStackParamList,
  'BoardList'
>;

const BoardDetailView: React.FC<IProps> = ({route: {params}}) => {
  const {postId, userId} = params;
  const {navigate, goBack} = useNavigation<BoardDetailScreenProps>();
  const replyInput = useInputState();
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 80 : 0;
  const animation = useRef(null);
  const {data, loading, refetch} = useQuery<getBoardtype, getBoardVariables>(
    GET_BOARD,
    {
      variables: {id: parseInt(postId, 10)},
      onCompleted: ({getBoard}) => {
        const {success, data: completeData} = getBoard;
        if (success && completeData) {
          if (completeData.Likes) {
            setLikesCount(completeData.Likes.length);
            if (
              completeData.Likes.findIndex(
                v => v.OwnerId === parseInt(userId, 10)
              ) === 0
            ) {
              setShowLotti(true);
              animation.current.play(0, 29);
            }
          }
        }
      },
    }
  );
  const [showLottie, setShowLotti] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  console.log(data?.getBoard.data?.Likes);

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
        Id: parseInt(postId, 10),
        UserId: parseInt(userId, 10),
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

  useEffect(() => {
    if (
      data?.getBoard?.data?.Likes?.findIndex(
        v => v.OwnerId === parseInt(userId, 10)
      ) === 0
    ) {
      setShowLotti(true);
      animation.current.play(0, 29);
    }
  }, [data, userId]);

  const onPress = useCallback(() => {
    toggleLikeMutation();
    if (!showLottie) {
      animation.current.play(0, 29);
    }
  }, [toggleLikeMutation, showLottie]);

  const handleReplySubmit = useCallback(async () => {
    await createReplyMutation({
      variables: {
        args: {
          UserId: parseInt(userId, 10),
          BoardId: parseInt(postId, 10),
          content: replyInput.value,
        },
      },
    });
  }, [userId, postId, replyInput.value, createReplyMutation]);

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

  const backAction = useCallback(
    () => (
      <TopNavigationAction
        icon={<Icon {...{width: 24, height: 24}} name="arrow-back" />}
        onPress={() =>
          navigate('BoardList', {
            userId,
            category: data!.getBoard!.data!.category!,
            refreshing: true,
          })
        }
      />
    ),
    [data, userId, navigate]
  );

  if (loading) {
    return <Loading />;
  }
  return (
    <SafeAreaView>
      <TopNavigation accessoryLeft={backAction} />
      <Container>
        <KeyboardAvoidingView
          behavior="position"
          keyboardVerticalOffset={keyboardVerticalOffset}>
          <Head>
            <Text category="h5">{data?.getBoard.data?.title}</Text>
            <Divider style={styles.divierMargin} />
            <BoardInfo>
              <TouchableOpacity>
                <Text category="s1" appearance="hint">
                  {data?.getBoard.data?.Writer.nickname}
                </Text>
              </TouchableOpacity>
              <Text category="s1" appearance="hint">
                {getDate(data?.getBoard.data?.createdAt || '')}
              </Text>
            </BoardInfo>
          </Head>
          <Divider style={styles.divierMargin} />
          <Content>
            <Text category="p1">{data?.getBoard.data?.content}</Text>
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
          </Like>
          <Divider style={styles.divierMargin} />
          <ReplySection>
            <ReplyContent>
              {data?.getBoard.data?.Replies?.map((rep, idx) => {
                return (
                  <ReplyRow key={idx}>
                    <TouchableOpacity activeOpacity={0.5}>
                      <Text style={styles.replUserName}>
                        {rep.User.nickname}
                        {data.getBoard.data?.Writer.id === rep.User.id && (
                          <Icon
                            {...{width: 8, height: 8}}
                            name="star"
                            fill="red"
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
                <Text>Loading...</Text>
              </LoadingScreen>
            )}
            <Divider style={styles.divierMargin} />
            <Input
              {...replyInput}
              status="primary"
              placeholder="답글 달기"
              accessoryRight={renderInputButton}
            />
          </ReplySection>
        </KeyboardAvoidingView>
      </Container>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  divierMargin: {
    marginTop: 20,
    marginBottom: 20,
  },
  icon: {
    position: 'absolute',
    width: 23,
    height: 23,
    top: 27.5,
    left: -11.5,
  },
  replUserName: {
    marginRight: 15,
  },
  repleAction: {
    marginLeft: 10,
  },
});

export default BoardDetailView;
