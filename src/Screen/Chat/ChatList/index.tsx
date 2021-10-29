import {useQuery, useReactiveVar} from '@apollo/client';
import {useNavigation} from '@react-navigation/core';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ListItem, Icon, Text, Divider} from '@ui-kitten/components';
import React, {useCallback} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {getDate} from '../../../common/getDate';
import {Container, Input} from '../../../common/SharedStyles';
import LoadingIndicator from '../../../components/LoadingIndicator';
import TopMenuWithGoback from '../../../components/TopMenuWithGoBack';
import {myIdVar} from '../../../graphql/client';
import {GET_CHATS} from '../../../graphql/query/sharedQuery';
import {ChatStackParamList} from '../../../navigators/ChatStackNavigator';
import {
  getChats as getChatsTypes,
  getChatsVariables,
  getChats_getChats_data_Members,
} from '../../../types/graphql';
import {ChatListBox, ListScrollView} from './styles';

type ChatListScreenProps = NativeStackNavigationProp<
  ChatStackParamList,
  'ChatList'
>;

const ChatListScreen = () => {
  const {navigate} = useNavigation<ChatListScreenProps>();
  const myId = useReactiveVar(myIdVar);
  const {data, loading} = useQuery<getChatsTypes, getChatsVariables>(
    GET_CHATS,
    {
      variables: {userId: myId},
      notifyOnNetworkStatusChange: true,
    }
  );

  const renderDate = useCallback(date => {
    return (
      <Text style={styles.date} category="c1">
        {getDate(date)}
      </Text>
    );
  }, []);

  const renderItemIcon = () => (
    <Icon {...{width: 25, height: 25}} name="person" />
  );

  const renderItem = ({item}) => {
    const {Members, messages} = item;
    let partner = '알수 없음';
    if (Members) {
      partner = Members.filter(
        (member: getChats_getChats_data_Members) => member.id !== myId
      );
    }
    return (
      <React.Fragment>
        <ListItem
          style={styles.listRow}
          onPress={() =>
            navigate('ChatDetail', {
              chatId: item.id,
              partnerId: partner[0].id,
            })
          }
          title={partner[0].nickname}
          description={messages[0].content}
          accessoryLeft={renderItemIcon}
          accessoryRight={() => renderDate(messages[0].createdAt)}
        />
        <Divider />
      </React.Fragment>
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
      <TopMenuWithGoback id={myId} />
      <ChatListBox>
        <View style={styles.inputBox}>
          <Input placeholder="사용자 검색" />
        </View>
        <Divider />
        {data?.getChats.data && data.getChats.data.length !== 0 ? (
          <ListScrollView data={data.getChats.data} renderItem={renderItem} />
        ) : (
          <View style={styles.listBox}>
            <Text>채팅 목록이 없습니다</Text>
          </View>
        )}
      </ChatListBox>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  inputBox: {
    width: '90%',
    marginLeft: 20,
  },
  listBox: {
    height: '90%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  listRow: {
    height: 70,
  },
  date: {
    marginRight: 20,
  },
});

export default ChatListScreen;
