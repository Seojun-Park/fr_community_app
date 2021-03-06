import {useMutation, useQuery, useSubscription} from '@apollo/client';
import {useNavigation} from '@react-navigation/core';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  ListItem,
  Icon,
  Text,
  Divider,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import React, {useCallback, useEffect, useState} from 'react';
import {
  Animated,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {getDateWithoutYear, getTime} from '../../../common/getDate';
import LoadingIndicator from '../../../components/Loading';
import {GET_CHATS} from '../../../graphql/query/sharedQuery';
import {
  getChats as getChatsTypes,
  getChatsVariables,
  getChats_getChats_data_Members,
  outChat as outChatTypes,
  outChatVariables,
  getDm as getDmTypes,
  getDmVariables,
} from '../../../types/graphql';
import {ChatListBox, ListScrollView} from './styles';
import {Swipeable} from 'react-native-gesture-handler';
import {OUT_CHAT} from '../../../graphql/mutation/sharedMutation';
import Toast from 'react-native-toast-message';
import {GET_DM} from '../../../graphql/subscription/subscription';
import Badge from '../../../components/Badge';
import Loading from '../../../components/Loading';
import {ChatStackParamList} from '../../../navigators/Chat/ChatStackNavigator';
import {Screen} from '../../../common/SharedStyles';
import Avatar from '../../../components/Avatar';

interface IProps {
  route: {
    params: {
      userId: string;
    };
  };
}

type ChatListScreenProps = NativeStackNavigationProp<
  ChatStackParamList,
  'ChatList'
>;

const ChatListScreen: React.FC<IProps> = ({route: {params}}) => {
  const {userId} = params;
  const {navigate, goBack} = useNavigation<ChatListScreenProps>();
  const [newMsg, setNewMsg] = useState<Array<number>>([]);
  const {data, loading, refetch, fetchMore} = useQuery<
    getChatsTypes,
    getChatsVariables
  >(GET_CHATS, {
    variables: {userId: parseInt(userId, 10)},
    notifyOnNetworkStatusChange: true,
  });

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
              text1: '?????? ??????',
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
              text1: '???????????? ?????? ??? ????????????',
              position: 'bottom',
            })}
          </>
        );
      }
    },
  });

  const {data: subscriptionData, loading: subscriptionLoading} =
    useSubscription<getDmTypes, getDmVariables>(GET_DM, {
      skip: !userId,
      variables: {
        userId: parseInt(userId, 10),
      },
      onSubscriptionData: ({subscriptionData: {data: completeData}}) => {
        if (completeData?.getDm.ChatId) {
          if (newMsg.indexOf(completeData.getDm.ChatId) === -1) {
            setNewMsg(prev => [...prev, completeData.getDm.ChatId]);
          }
        }
      },
    });

  useEffect(() => {
    if (subscriptionData) {
      fetchMore({
        variables: {
          userId: parseInt(userId, 10),
        },
      });
    }
  }, [subscriptionData, fetchMore, userId]);

  const renderDate = useCallback(
    (date, id) => {
      const currentDate = new Date().getTime() / 1000;
      return (
        <View style={styles.badgeContaier}>
          <Text style={styles.date} category="c1">
            {currentDate - date / 1000 < 8640
              ? `${getDateWithoutYear(date)} ${getTime(date)}`
              : `${getTime(date)}`}
          </Text>
          {newMsg.indexOf(id) === 0 && <Badge />}
        </View>
      );
    },
    [newMsg]
  );

  const renderItemIcon = () => (
    <View>
      <Avatar size={40} />
    </View>
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
                    userId: parseInt(userId, 10),
                  },
                })
              }>
              <Text style={styles.textStyle} category={'s1'}>
                ?????????
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      );
    },
    [userId, outChat]
  );

  const renderItem = ({item}) => {
    const {Members, messages} = item;
    let partner = '?????? ??????';
    if (Members) {
      partner = Members.filter(
        (member: getChats_getChats_data_Members) =>
          member.id !== parseInt(userId, 10)
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
                  setNewMsg([]);
                  navigate('ChatDetail', {
                    userId: parseInt(userId, 10),
                    chatId: item.id,
                    partnerId: partner[0].id,
                  });
                } else {
                  return (
                    <>
                      {Toast.show({
                        type: 'info',
                        text1: '???????????? ???????????? ???????????????',
                        position: 'bottom',
                      })}
                    </>
                  );
                }
              }}
              title={partner[0] ? partner[0].nickname : '????????????'}
              description={messages[messages.length - 1].content}
              accessoryLeft={renderItemIcon}
              accessoryRight={() =>
                renderDate(messages[0].createdAt, messages[0].ChatId)
              }
            />
          </Swipeable>
        )}
        <Divider />
      </React.Fragment>
    );
  };

  if (loading && subscriptionLoading) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={styles.screen}>
      <TopNavigation title="Chat" />
      <ChatListBox>
        <Divider />
        {data?.getChats.data && data.getChats.data.length !== 0 ? (
          <ListScrollView
            data={data.getChats.data}
            renderItem={renderItem}
            refreshControl={
              <RefreshControl refreshing={false} onRefresh={() => refetch()} />
            }
          />
        ) : (
          <View style={styles.listBox}>
            <Text>?????? ????????? ????????????</Text>
          </View>
        )}
      </ChatListBox>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    height: '100%',
  },
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
  badgeContaier: {
    flexDirection: 'row',
  },
});

export default ChatListScreen;
