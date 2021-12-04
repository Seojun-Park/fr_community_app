import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useMutation, useQuery, useSubscription} from '@apollo/client';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  View,
  Keyboard,
} from 'react-native';
import TopMenuWithGoback from '../../../components/TopMenuWithGoBack';
import {
  dmSubscription as dmSubscriptionType,
  getChatMessages as getChatMessagesType,
  getChatMessagesVariables,
  sendDm as sendDmType,
  sendDmVariables,
  dmSubscriptionVariables,
  memberOut as memberOutType,
  memberOutVariables,
  checkChatMember as checkChatMemberType,
  checkChatMemberVariables,
  getChatMessages_getChatMessages_data_Receiver,
  getChatMessages_getChatMessages_data_Sender,
} from '../../../types/graphql';
import {
  GET_CHAT_MESSAGE,
  CHECK_CHAT_MEMBER,
} from '../../../graphql/query/sharedQuery';
import {Input} from '../../../common/SharedStyles';
import LoadingIndicator from '../../../components/Loading';
import {
  DM_SUBSCRIPTION,
  MEMBER_OUT,
} from '../../../graphql/subscription/subscription';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  AvatarIcon,
  InputBox,
  MessageBox,
  MessageItem,
  MessageList,
  MessageRow,
  MessageText,
  SendButton,
} from './styles';
import {Icon, Text} from '@ui-kitten/components';
import {useInputState} from '../../../hooks/useInput';
import {getTime} from '../../../common/getDate';
import Avatar from '../../../components/Avatar';
import Toast from 'react-native-toast-message';
import {SEND_DM} from '../../../graphql/mutation/sharedMutation';
import {ChatStackParamList} from '../../../navigators/Chat/ChatStackNavigator';
import Loading from '../../../components/Loading';
import UserProfileModal from '../../../components/UserProfileModal';

type ChatDetailScreenProps = NativeStackNavigationProp<
  ChatStackParamList,
  'ChatDetail'
>;
interface IProps {
  route: {
    params: {
      userId: number;
      chatId: number;
      partnerId: number;
    };
  };
}

const SendIcon = (props: any) => <Icon {...props} name="paper-plane-outline" />;

const ChatDetailScreen: React.FC<IProps> = ({route: {params}}) => {
  const {chatId, partnerId, userId} = params;
  const scrollRef = useRef<FlatList<any>>(null);
  // const {navigate} = useNavigation<ChatDetailScreenProps>();
  const msgInput = useInputState('');
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 20 : 0;
  const [load, setLoad] = useState<number>(1);
  const [executing, setExecuting] = useState<boolean>(false);
  const [memberStatus, setMemberStatus] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [other, setOther] = useState<
    | getChatMessages_getChatMessages_data_Receiver
    | getChatMessages_getChatMessages_data_Sender
    | null
  >(null);

  const {data, loading, refetch, fetchMore} = useQuery<
    getChatMessagesType,
    getChatMessagesVariables
  >(GET_CHAT_MESSAGE, {
    variables: {ChatId: chatId, load},
    onCompleted: ({getChatMessages}) => {
      const {success, error, data: getChatMessageData} = getChatMessages;
      if (success && getChatMessageData) {
        scrollRef.current?.scrollToEnd();
        if (!executing) {
          scrollRef.current?.scrollToEnd();
        }
      } else {
        return (
          <>
            {Toast.show({
              type: 'error',
              text1: `${error}`,
              position: 'bottom',
            })}
          </>
        );
      }
    },
  });

  useQuery<checkChatMemberType, checkChatMemberVariables>(CHECK_CHAT_MEMBER, {
    skip: !chatId,
    variables: {
      chatId,
    },
    onCompleted: ({checkChatMember}) => {
      const {success, error, data: checkChatMemberData} = checkChatMember;
      if (success && checkChatMemberData) {
        if (
          checkChatMemberData.Member1 === null ||
          checkChatMemberData.Member2 === null
        ) {
          setMemberStatus(true);
        }
      } else {
        console.log(error);
      }
    },
  });

  const {data: subscriptionData, loading: subscriptionLoading} =
    useSubscription<dmSubscriptionType, dmSubscriptionVariables>(
      DM_SUBSCRIPTION,
      {
        skip: !chatId,
        variables: {
          ChatId: chatId,
        },
      }
    );

  const {data: memberOutData, loading: memberOutLoading} = useSubscription<
    memberOutType,
    memberOutVariables
  >(MEMBER_OUT, {
    skip: !chatId,
    variables: {
      chatId,
    },
  });

  useEffect(() => {
    if (memberOutData) {
      if (refetch) {
        refetch();
      }
      setMemberStatus(true);
    }
  }, [memberOutData, refetch]);

  const [sendDm, {loading: mutationLoading}] = useMutation<
    sendDmType,
    sendDmVariables
  >(SEND_DM, {
    onCompleted: ({sendDm: completeSendDm}) => {
      const {success, error, data: sendDmData} = completeSendDm;
      if (success && sendDmData) {
        if (refetch) {
          refetch();
        }
        msgInput.onChangeText('');
        scrollRef.current?.scrollToEnd();
      } else {
        console.log(error);
      }
    },
  });

  const onSubmit = useCallback(async () => {
    await sendDm({
      variables: {
        args: {
          SenderId: userId,
          ReceiverId: partnerId,
          content: msgInput.value,
          ChatId: chatId,
        },
      },
    });
    Keyboard.dismiss();
  }, [chatId, userId, partnerId, sendDm, msgInput.value]);

  const onFetch = useCallback(
    loadProp => {
      setLoad(loadProp + 1);
      fetchMore({
        variables: {
          ChatId: chatId,
          load: loadProp,
        },
      });
    },
    [chatId, fetchMore]
  );

  useEffect(() => {
    if (!executing) {
      if (data?.getChatMessages.data && data?.getChatMessages.data.length > 1) {
        scrollRef.current?.scrollToEnd();
      }
    }
  }, [data?.getChatMessages.data, executing]);

  useEffect(() => {
    if (fetchMore) {
      fetchMore({
        variables: {
          ChatId: chatId,
          load: load,
        },
      });
    }
  }, [subscriptionData, fetchMore, chatId, load]);

  const renderDate = useCallback(date => {
    return <Text category="c1">{getTime(date)}</Text>;
  }, []);

  const renderInputRight = useCallback(() => {
    return (
      <SendButton
        onPress={() => onSubmit()}
        appearance="primary"
        accessoryLeft={SendIcon}
        disabled={
          msgInput.value.trim() ? false : mutationLoading ? false : true
        }
      />
    );
  }, [msgInput.value, mutationLoading, onSubmit]);

  const renderItem = useCallback(
    ({item}) => {
      const {Receiver, Sender, content, SenderId, createdAt} = item;
      let me;
      if (SenderId === userId) {
        me = 'sender';
        setOther(Receiver);
      } else {
        me = 'receiver';
        setOther(Sender);
      }
      return (
        <>
          {me === 'sender' ? (
            <MessageRow me={true}>
              <View style={styles.dateLeft}>{renderDate(createdAt)}</View>
              <MessageItem
                title={() => {
                  return <MessageText>{content}</MessageText>;
                }}
                me={true}
              />
            </MessageRow>
          ) : (
            <MessageRow me={false}>
              <React.Fragment>
                <AvatarIcon onPress={() => setModalVisible(true)}>
                  <Avatar size={40} />
                </AvatarIcon>
                <MessageItem title={content} me={false} />
                <View style={styles.dateRight}>{renderDate(createdAt)}</View>
              </React.Fragment>
            </MessageRow>
          )}
        </>
      );
    },
    [userId, renderDate]
  );

  if (subscriptionLoading && !chatId && memberOutLoading) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={styles.screen}>
      <KeyboardAvoidingView
        behavior="position"
        keyboardVerticalOffset={keyboardVerticalOffset}>
        <TopMenuWithGoback id={0} />
        {loading && <LoadingIndicator size="large" />}
        <UserProfileModal
          isVisible={modalVisible}
          user={other}
          onClose={() => setModalVisible(false)}
        />
        <MessageBox>
          {memberStatus && (
            <View style={styles.memberOutNotice}>
              <Text>상대방이 채팅방을 나갔습니다.</Text>
            </View>
          )}
          {data?.getChatMessages.data && (
            <MessageList
              bounces={true}
              refreshControl={
                <RefreshControl
                  refreshing={false}
                  onRefresh={() => {
                    setExecuting(true);
                    onFetch(load);
                  }}
                />
              }
              ref={scrollRef}
              data={data.getChatMessages.data}
              renderItem={renderItem}
            />
          )}
          <InputBox>
            <Input
              style={styles.inputStyle}
              {...msgInput}
              returnKeyType="send"
              autoCorrect={false}
              autoCapitalize="none"
              placeholder={'메시지를 입력해 주세요'}
              accessoryRight={renderInputRight}
            />
          </InputBox>
        </MessageBox>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    height: '96%',
  },
  inputStyle: {
    width: '95%',
  },
  divider: {
    paddingTop: 5,
    paddingBottom: 2,
  },
  messageFont: {
    color: 'white',
  },
  dateLeft: {
    marginRight: 15,
  },
  dateRight: {
    marginLeft: 15,
  },
  memberOutNotice: {
    backgroundColor: '#f6f8fb',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
  },
});

export default ChatDetailScreen;
