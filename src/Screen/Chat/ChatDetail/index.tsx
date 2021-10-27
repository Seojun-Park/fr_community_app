import React, {useEffect} from 'react';
import {useQuery, useReactiveVar} from '@apollo/client';
import {SafeAreaView} from 'react-native';
import TopMenuWithGoback from '../../../components/TopMenuWithGoBack';
import {myIdVar} from '../../../graphql/client';
import {getChat as getChatType, getChatVariables} from '../../../types/graphql';
import {GET_CHAT} from '../../../graphql/query/sharedQuery';
import {Container} from '../../../common/SharedStyles';
import LoadingIndicator from '../../../components/LoadingIndicator';
import {DM_SUBSCRIPTION} from '../../../graphql/subscription/subscription';
import {useNavigation} from '@react-navigation/core';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ChatStackParamList} from '../../../navigators/ChatStackNavigator';

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

const ChatDetailScreen: React.FC<IProps> = ({route}) => {
  const {
    params: {id},
  } = route;
  const {navigate} = useNavigation<ChatDetailScreenProps>();
  const myId = useReactiveVar(myIdVar);

  console.log(id);

  const {data, loading, subscribeToMore} = useQuery<
    getChatType,
    getChatVariables
  >(GET_CHAT, {
    variables: {chatId: 1},
  });

  useEffect(() => {
    subscribeToMore({
      document: DM_SUBSCRIPTION,
      updateQuery: (prev, {subscriptionData}) => {
        console.log(subscriptionData);
      },
    });
  }, [subscribeToMore]);

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
    </SafeAreaView>
  );
};

export default ChatDetailScreen;
