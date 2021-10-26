import {useQuery, useReactiveVar} from '@apollo/client';
import {ListItem, Icon, Text} from '@ui-kitten/components';
import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {Button, Input} from '../../../common/SharedStyles';
import TopMenuWithGoback from '../../../components/TopMenuWithGoBack';
import {myIdVar} from '../../../graphql/client';
import {GET_CHATS} from '../../../graphql/query/sharedQuery';
import {
  getChats as getChatsTypes,
  getChatsVariables,
} from '../../../types/graphql';
import {ChatListBox, ListScrollView} from './styles';

const ChatListScreen = () => {
  const myId = useReactiveVar(myIdVar);
  const {data} = useQuery<getChatsTypes, getChatsVariables>(GET_CHATS, {
    variables: {userId: myId},
  });

  const renderItemAccessory = () => <Button size="tiny">FOLLOW</Button>;

  const renderItemIcon = () => (
    <Icon {...{width: 25, height: 25}} name="person" />
  );

  const renderItem = ({item, index}) => {
    return (
      <ListItem
        title={`${item.title} ${index + 1}`}
        description={`${item.description} ${index + 1}`}
        accessoryLeft={renderItemIcon}
        accessoryRight={renderItemAccessory}
      />
    );
  };

  return (
    <SafeAreaView>
      <TopMenuWithGoback id={myId} />
      <ChatListBox>
        <View style={styles.inputBox}>
          <Input placeholder="사용자 검색" />
        </View>
        {data?.getChats.data && data.getChats.data.length !== 0 ? (
          <ListScrollView data={data} renderItem={renderItem} />
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
});

export default ChatListScreen;
