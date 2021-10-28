import React, {useCallback, useEffect} from 'react';
import {useQuery, useReactiveVar} from '@apollo/client';
import {
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import TopMenuWithGoback from '../../../components/TopMenuWithGoBack';
import {myIdVar} from '../../../graphql/client';
import {getChat as getChatType, getChatVariables} from '../../../types/graphql';
import {GET_CHAT} from '../../../graphql/query/sharedQuery';
import {Container, Input} from '../../../common/SharedStyles';
import LoadingIndicator from '../../../components/LoadingIndicator';
import {DM_SUBSCRIPTION} from '../../../graphql/subscription/subscription';
import {useNavigation} from '@react-navigation/core';
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

type ChatDetailScreenProps = NativeStackNavigationProp<
  ChatStackParamList,
  'ChatDetail'
>;
interface IProps {
  route: {
    params: {
      id: number;
    };
  };
}

const SendIcon = props => <Icon {...props} name="paper-plane-outline" />;

const ChatDetailScreen: React.FC<IProps> = ({route}) => {
  const {
    params: {id},
  } = route;
  const {navigate} = useNavigation<ChatDetailScreenProps>();
  const myId = useReactiveVar(myIdVar);
  const msgInput = useInputState('');

  const {data, loading, subscribeToMore} = useQuery<
    getChatType,
    getChatVariables
  >(GET_CHAT, {
    variables: {chatId: id},
  });

  useEffect(() => {
    subscribeToMore({
      document: DM_SUBSCRIPTION,
      updateQuery: (prev, {subscriptionData}): any => {
        console.log(subscriptionData);
      },
    });
  }, [subscribeToMore]);

  const renderDate = useCallback(date => {
    return <Text category="c1">{getDate(date)}</Text>;
  }, []);

  const renderInputRight = useCallback(() => {
    return (
      <SendButton
        appearance="primary"
        accessoryLeft={SendIcon}
        disabled={msgInput.value.trim() ? false : true}
      />
    );
  }, [msgInput.value]);

  const renderItem = ({item}) => {
    const {SenderId, ReceiverId, content, createdAt, Sender, Receiver} = item;
    const senderNickname = Sender.nickname;
    const receiverNickname = Receiver.nickname;
    console.log(ReceiverId, myId);
    return (
      <MessageRow me={ReceiverId === myId}>
        {ReceiverId === myId ? (
          <React.Fragment>
            <TouchableOpacity>
              <Avatar nickname={senderNickname} />
            </TouchableOpacity>
            <MessageItem title={`${content}`} me={ReceiverId === myId} />
          </React.Fragment>
        ) : (
          <>
            <MessageItem title={`${content}`} me={ReceiverId === myId} />
          </>
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
    <SafeAreaView style={styles.flex}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior="padding"
        contentContainerStyle={styles.keyboardView}>
        <TopMenuWithGoback id={0} />
        <Divider />
        <MessageBox style={styles.flex}>
          {data?.getChat.data && data?.getChat.data.messages && (
            <MessageList
              data={data.getChat.data.messages}
              ItemSeparatorComponent={Divider}
              renderItem={renderItem}
            />
          )}
          <Divider style={styles.divider} />
          <InputBox>
            <Input
              style={styles.inputStyle}
              {...msgInput}
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
  flex: {
    flex: 1,
  },
  inputStyle: {
    width: '95%',
    justifyContent: 'center',
  },
  divider: {
    paddingTop: 2,
    paddingBottom: 2,
  },
  keyboardView: {
    marginBottom: 40,
  },
});

export default ChatDetailScreen;
