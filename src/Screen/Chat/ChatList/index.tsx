import {useMutation, useQuery, useReactiveVar} from '@apollo/client';
import {useNavigation} from '@react-navigation/core';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ListItem, Icon, Text, Divider} from '@ui-kitten/components';
import React, {useCallback} from 'react';
import {
  Animated,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
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
  outChat as outChatTypes,
  outChatVariables,
} from '../../../types/graphql';
import {ChatListBox, ListScrollView} from './styles';
import {Swipeable} from 'react-native-gesture-handler';
import {OUT_CHAT} from '../../../graphql/mutation/sharedMutation';
import Toast from 'react-native-toast-message';

type ChatListScreenProps = NativeStackNavigationProp<
  ChatStackParamList,
  'ChatList'
>;

const ChatListScreen = () => {
  const {navigate} = useNavigation<ChatListScreenProps>();
  const myId = useReactiveVar(myIdVar);
  const {data, loading, refetch} = useQuery<getChatsTypes, getChatsVariables>(
    GET_CHATS,
    {
      variables: {userId: myId},
      notifyOnNetworkStatusChange: true,
    }
  );

  const [outChat, {loading: mutationLoading}] = useMutation<
    outChatTypes,
    outChatVariables
  >(OUT_CHAT, {
    onCompleted: ({outChat: outChatCompleteData}) => {
      const {success, error} = outChatCompleteData;
      if (success) {
        if (refetch) {
          refetch();
        }
        return (
          <>
            {Toast.show({
              type: 'success',
              text1: '삭제 완료',
              position: 'bottom',
            })}
          </>
        );
      } else {
        console.error(error);
        return (
          <>
            {Toast.show({
              type: 'error',
              text1: '채팅방을 나갈 수 없습니다',
              position: 'bottom',
            })}
          </>
        );
      }
    },
  });

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

  const renderRightActions = useCallback(
    (
      progress: Animated.AnimatedInterpolation,
      dragAnimatedValue: Animated.AnimatedInterpolation,
      id: number
    ) => {
      const opacity = dragAnimatedValue.interpolate({
        inputRange: [-150, 0],
        outputRange: [1, 0],
        extrapolate: 'clamp',
      });
      return (
        <View style={styles.swipedRow}>
          <Animated.View style={[styles.deleteButton, {opacity}]}>
            <TouchableOpacity
              onPress={() =>
                outChat({
                  variables: {
                    chatId: id,
                    userId: myId,
                  },
                })
              }>
              <Text style={styles.textStyle} category={'s1'}>
                나가기
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      );
    },
    []
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
        <Divider />
        {mutationLoading ? (
          <LoadingIndicator size="small" />
        ) : (
          <Swipeable
            renderRightActions={(progress, dragAnimatedValue) =>
              renderRightActions(progress, dragAnimatedValue, item.id)
            }>
            <ListItem
              style={styles.listRow}
              onPress={() => {
                if (partner[0]) {
                  navigate('ChatDetail', {
                    chatId: item.id,
                    partnerId: partner[0].id,
                  });
                } else {
                  return (
                    <>
                      {Toast.show({
                        type: 'info',
                        text1: '상대방이 채팅방을 나갔습니다',
                        position: 'bottom',
                      })}
                    </>
                  );
                }
              }}
              title={partner[0] ? partner[0].nickname : '알수없음'}
              description={messages[messages.length - 1].content}
              accessoryLeft={renderItemIcon}
              accessoryRight={() => renderDate(messages[0].createdAt)}
            />
          </Swipeable>
        )}
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
        {/* <View style={styles.inputBox}>
          <Input placeholder="사용자 검색" />
        </View> */}
        {/* <Divider /> */}
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
  swipedRow: {
    width: 100,
    height: '100%',
  },
  textStyle: {
    color: 'black',
  },
  deleteButton: {
    backgroundColor: '#FF3D71',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ChatListScreen;
