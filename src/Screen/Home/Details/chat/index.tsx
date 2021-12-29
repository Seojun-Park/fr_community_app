import {useNavigation} from '@react-navigation/core';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useRef, useState} from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import {List, Layout} from '@ui-kitten/components';
import {Text} from 'react-native-svg';
import TopMenuWithGoback from '../../../../components/TopMenuWithGoBack';
import {useInputState} from '../../../../hooks/useInput';
import {MarketStackParamList} from '../../../../navigators/Home/Market/MarketStackNavigator';
import styled from 'styled-components';
import {Input} from '../../../../common/SharedStyles';
import {
  getChatMessages as getChatMessagesType,
  getChatMessagesVariables,
} from '../../../../types/graphql';
import {GET_CHAT_MESSAGE} from '../../../../graphql/query/sharedQuery';
import {useQuery} from '@apollo/client';

interface IProps {
  route: {
    params: {
      userId: string;
      partnerId: string;
    };
  };
}

type MarketDetailScreenProps = NativeStackNavigationProp<
  MarketStackParamList,
  'MarketChatDetail'
>;

const BoardChatDetail: React.FC<IProps> = ({route: {params}}) => {
  const {userId, partnerId} = params;
  const {navigate} = useNavigation<MarketDetailScreenProps>();
  const scrollRef = useRef<FlatList<any>>(null);
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 20 : 0;
  const msgInput = useInputState('');
  const [executing, setExecuting] = useState<boolean>(false);
  const [memberStatus, setMemberStatus] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  console.log(userId, partnerId);
  return (
    <SafeAreaView style={styles.screen}>
      <KeyboardAvoidingView
        behavior="position"
        keyboardVerticalOffset={keyboardVerticalOffset}>
        <TopMenuWithGoback id={0} />
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
                    // onFetch(load);
                  }}
                />
              }
              ref={scrollRef}
              // data={data.getChatMessages.data}
              // renderItem={renderItem}
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
              // accessoryRight={renderInputRight}
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

export default BoardChatDetail;

const MessageBox = styled(View)`
  height: 93%;
`;

const MessageList = styled(List)`
  padding: 10px 20px;
  height: 100%;
  overflow: scroll;
`;

const InputBox = styled(Layout)`
  width: 100%;
  align-items: center;
`;
