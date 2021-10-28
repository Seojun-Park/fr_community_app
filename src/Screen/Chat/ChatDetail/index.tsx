import React, {useCallback, useEffect, useRef} from 'react';
import {useMutation, useQuery, useReactiveVar} from '@apollo/client';
import {
  FlatList,
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import TopMenuWithGoback from '../../../components/TopMenuWithGoBack';
import {myIdVar} from '../../../graphql/client';
import {
  getChatMessages as getChatMessagesType,
  getChatMessagesVariables,
  sendDm as sendDmType,
  sendDmVariables,
} from '../../../types/graphql';
import {GET_CHAT_MESSAGE} from '../../../graphql/query/sharedQuery';
import {Container, Input} from '../../../common/SharedStyles';
import LoadingIndicator from '../../../components/LoadingIndicator';
import {DM_SUBSCRIPTION} from '../../../graphql/subscription/subscription';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ChatStackParamList} from '../../../navigators/ChatStackNavigator';
import {
  InputBox,
  MessageBox,
  MessageItem,
  MessageList,
  MessageRow,
  SendButton,
} from './styles';
import {Divider, Icon, Text} from '@ui-kitten/components';
import {useInputState} from '../../../hooks/useInput';
import {getDate} from '../../../common/getDate';
import Avatar from '../../../components/Avatar';
import Toast from 'react-native-toast-message';
import {SEND_DM} from '../../../graphql/mutation/sharedMutation';

type ChatDetailScreenProps = NativeStackNavigationProp<
  ChatStackParamList,
  'ChatDetail'
>;
interface IProps {
  route: {
    params: {
      chatId: number;
      partnerId: number;
    };
  };
}

const SendIcon = (props: any) => <Icon {...props} name="paper-plane-outline" />;

const ChatDetailScreen: React.FC<IProps> = ({route}) => {
  const {
    params: {chatId, partnerId},
  } = route;
  const scrollRef = useRef<FlatList<any>>(null);
  // const {navigate} = useNavigation<ChatDetailScreenProps>();
  const myId = useReactiveVar(myIdVar);
  const msgInput = useInputState('');
  // const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0;

  const {data, loading, subscribeToMore, refetch} = useQuery<
    getChatMessagesType,
    getChatMessagesVariables
  >(GET_CHAT_MESSAGE, {
    variables: {ChatId: chatId},
    onCompleted: ({getChatMessages}) => {
      const {success, error} = getChatMessages;
      if (success) {
        scrollRef.current?.scrollToEnd();
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

  // const {data: subscriptionData} = useSubscription(DM_SUBSCRIPTION);

  // console.log(subscriptionData);

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
      } else {
        console.log(error);
      }
    },
  });

  const onSubmit = useCallback(async () => {
    await sendDm({
      variables: {
        args: {
          SenderId: myId,
          ReceiverId: partnerId,
          content: msgInput.value,
          ChatId: chatId,
        },
      },
    });
  }, [chatId, myId, partnerId, sendDm, msgInput.value]);

  useEffect(() => {
    subscribeToMore({
      document: DM_SUBSCRIPTION,
      updateQuery: (prev, {subscriptionData}): any => {
        console.log(subscriptionData);
      },
    });
  }, [subscribeToMore]);

  useEffect(() => {
    if (data?.getChatMessages.data && data?.getChatMessages.data.length === 1) {
      scrollRef.current?.scrollToEnd();
    }
  }, [data?.getChatMessages.data]);

  const renderDate = useCallback(date => {
    return <Text category="c1">{getDate(date)}</Text>;
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

  const renderItem = ({item}) => {
    const {Receiver, Sender, content, ReceiverId, SenderId, createdAt} = item;
    return (
      <MessageRow me={ReceiverId === myId}>
        {ReceiverId === myId ? (
          <React.Fragment>
            <TouchableOpacity>
              <Avatar nickname={Receiver.nickname} />
            </TouchableOpacity>
            <MessageItem title={`${content}`} me={ReceiverId === myId} />
            <View style={styles.dateRight}>{renderDate(createdAt)}</View>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <View style={styles.dateLeft}>{renderDate(createdAt)}</View>
            <MessageItem title={`${content}`} me={ReceiverId === myId} />
          </React.Fragment>
        )}
      </MessageRow>
    );
  };

  if (loading) {
    return (
      <Container>
        <LoadingIndicator size="large" />
      </Container>
    );
  }

  return (
    <SafeAreaView>
      <KeyboardAvoidingView behavior="position">
        <TopMenuWithGoback id={0} />
        <Divider />
        <MessageBox>
          {data?.getChatMessages.data && (
            <MessageList
              ref={scrollRef}
              data={data.getChatMessages.data}
              ItemSeparatorComponent={Divider}
              renderItem={renderItem}
            />
          )}
          <Divider style={styles.divider} />
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
  inputStyle: {
    width: '95%',
  },
  divider: {
    paddingTop: 2,
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
});

export default ChatDetailScreen;
