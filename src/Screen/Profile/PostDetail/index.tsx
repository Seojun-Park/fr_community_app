import React, {useCallback, useEffect, useState} from 'react';
import {
  Icon,
  Text,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import {LoadingScreen, Screen} from '../../../common/SharedStyles';
import {useNavigation} from '@react-navigation/core';
import {useLazyQuery} from '@apollo/client';
import {
  GET_BOARD,
  GET_MARKET,
  GET_RENT,
  GET_MEET,
  GET_RECRUIT,
} from '../../../graphql/query/sharedQuery';
import {
  getBoard as getBoardType,
  getBoardVariables,
  getRent as getRentType,
  getRentVariables,
  getMarket as getMarketType,
  getMarketVariables,
  getMeet as getMeetType,
  getMeetVariables,
  getRecruit as getRecruitType,
  getRecruitVariables,
  getBoard_getBoard_data,
  getRent_getRent_data,
  getMarket_getMarket_data,
  getRecruit_getRecruit_data,
  getMeet_getMeet_data,
} from '../../../types/graphql';
import Toast from 'react-native-toast-message';
import BoardDetailView from '../../../components/Details/board';
import MarketDetailView from '../../../components/Details/market';
import RentDetailView from '../../../components/Details/rent';
import RecruitDetailView from '../../../components/Details/recruit';
import MeetDetailView from '../../../components/Details/meet';
import {StyleSheet, View} from 'react-native';

interface IProps {
  route: {
    params: {
      userId: string;
      id: number;
      category: string;
    };
  };
}

const PostDetailScreen: React.FC<IProps> = ({route: {params}}) => {
  const {goBack} = useNavigation();
  const {id, category, userId} = params;
  const [data, setData] = useState<
    | getBoard_getBoard_data
    | getMarket_getMarket_data
    | getRecruit_getRecruit_data
    | getMeet_getMeet_data
    | getRent_getRent_data
    | null
    | undefined
  >(null);

  const [getBoardQuery, {refetch: boardRefetch, loading: boardLoading}] =
    useLazyQuery<getBoardType, getBoardVariables>(GET_BOARD, {
      notifyOnNetworkStatusChange: true,
      onCompleted: ({getBoard}) => {
        const {success, data: boardData, error} = getBoard;
        if (success && boardData) {
          setData(boardData);
        } else {
          console.error(error);
          return (
            <>
              {Toast.show({
                type: 'error',
                text1: '데이터를 가져올 수 없습니다',
              })}
            </>
          );
        }
      },
    });
  const [getRentQuery, {refetch: rentRefetch, loading: rentLoading}] =
    useLazyQuery<getRentType, getRentVariables>(GET_RENT, {
      notifyOnNetworkStatusChange: true,
      onCompleted: ({getRent}) => {
        const {success, error, data: rentData} = getRent;
        if (success && rentData) {
          setData(rentData);
        } else {
          console.error(error);
          return (
            <>
              {Toast.show({
                type: 'error',
                text1: '데이터를 가져올 수 없습니다',
              })}
            </>
          );
        }
      },
    });
  const [getMarketQuery, {refetch: marketRefetch, loading: marketLoading}] =
    useLazyQuery<getMarketType, getMarketVariables>(GET_MARKET, {
      notifyOnNetworkStatusChange: true,
      onCompleted: ({getMarket}) => {
        const {success, error, data: marketData} = getMarket;
        if (success && marketData) {
          setData(marketData);
        } else {
          console.error(error);
          return (
            <>
              {Toast.show({
                type: 'error',
                text1: '데이터를 가져올 수 없습니다',
              })}
            </>
          );
        }
      },
    });
  const [getMeetQuery, {refetch: meetRefetch, loading: meetLoading}] =
    useLazyQuery<getMeetType, getMeetVariables>(GET_MEET, {
      notifyOnNetworkStatusChange: true,
      onCompleted: ({getMeet}) => {
        const {success, error, data: meetData} = getMeet;
        if (success && meetData) {
          setData(meetData);
        } else {
          console.error(error);
          return (
            <>
              {Toast.show({
                type: 'error',
                text1: '데이터를 가져올 수 없습니다',
              })}
            </>
          );
        }
      },
    });
  const [getRecruitQuery, {refetch: recruitRefetch, loading: recruitLoading}] =
    useLazyQuery<getRecruitType, getRecruitVariables>(GET_RECRUIT, {
      notifyOnNetworkStatusChange: true,
      onCompleted: ({getRecruit}) => {
        const {success, error, data: recruitData} = getRecruit;
        if (success && recruitData) {
          setData(recruitData);
        } else {
          console.error(error);
          return (
            <>
              {Toast.show({
                type: 'error',
                text1: '데이터를 가져올 수 없습니다',
              })}
            </>
          );
        }
      },
    });

  useEffect(() => {
    switch (category) {
      case 'board':
        getBoardQuery({variables: {id}});
        break;
      case 'rent':
        getRentQuery({variables: {id}});
        break;
      case 'market':
        getMarketQuery({variables: {id}});
        break;
      case 'recruit':
        getRecruitQuery({variables: {id}});
        break;
      case 'meet':
        getMeetQuery({variables: {id}});
        break;
    }
  }, [
    category,
    id,
    getBoardQuery,
    getRecruitQuery,
    getRentQuery,
    getMarketQuery,
    getMeetQuery,
  ]);

  const renderDetail = useCallback(
    data => {
      switch (category) {
        case 'board':
          if (data?.__typename === 'Board' && boardRefetch) {
            return (
              <BoardDetailView
                board={data}
                refetch={boardRefetch}
                id={id}
                userId={parseInt(userId, 10)}
                loading={boardLoading}
              />
            );
          }
          return (
            <>
              {Toast.show({
                position: 'bottom',
                type: 'error',
                text1: '게시물을 찾을 수 없습니다',
              })}
              {goBack()}
            </>
          );
        case 'market':
          if (data?.__typename === 'Market' && marketRefetch) {
            return (
              <MarketDetailView
                market={data}
                refetch={marketRefetch}
                id={id}
                userId={parseInt(userId, 10)}
                loading={marketLoading}
              />
            );
          }
          return (
            <>
              {Toast.show({
                position: 'bottom',
                type: 'error',
                text1: '게시물을 찾을 수 없습니다',
              })}
              {goBack()}
            </>
          );
        case 'rent':
          if (data?.__typename === 'Rent' && rentRefetch) {
            return (
              <RentDetailView
                rent={data}
                refetch={rentRefetch}
                id={id}
                userId={parseInt(userId, 10)}
                loading={rentLoading}
              />
            );
          }
          return (
            <>
              {Toast.show({
                position: 'bottom',
                type: 'error',
                text1: '게시물을 찾을 수 없습니다',
              })}
              {goBack()}
            </>
          );
        case 'recruit':
          if (data?.__typename === 'Rent' && recruitRefetch) {
            return (
              <RecruitDetailView
                recruit={data}
                refetch={recruitRefetch}
                id={id}
                userId={parseInt(userId, 10)}
                loading={recruitLoading}
              />
            );
          }
          return (
            <>
              {Toast.show({
                position: 'bottom',
                type: 'error',
                text1: '게시물을 찾을 수 없습니다',
              })}
              {goBack()}
            </>
          );
        case 'meet':
          if (data?.__typename === 'Meet' && meetRefetch) {
            return (
              <MeetDetailView
                meet={data}
                refetch={meetRefetch}
                id={id}
                userId={parseInt(userId, 10)}
                loading={meetLoading}
              />
            );
          }
          return (
            <>
              {Toast.show({
                position: 'bottom',
                type: 'error',
                text1: '게시물을 찾을 수 없습니다',
              })}
              {goBack()}
            </>
          );
      }
    },
    [
      userId,
      category,
      goBack,
      boardLoading,
      boardRefetch,
      marketLoading,
      marketRefetch,
      rentLoading,
      rentRefetch,
      recruitLoading,
      recruitRefetch,
      meetLoading,
      meetRefetch,
      id,
    ]
  );

  const backAction = () => (
    <TopNavigationAction
      icon={<Icon {...{width: 24, height: 24}} name="arrow-back" />}
      onPress={() => goBack()}
    />
  );

  if (!data) {
    return (
      <LoadingScreen>
        <Text>loading...</Text>
      </LoadingScreen>
    );
  }

  return (
    <Screen>
      <TopNavigation accessoryLeft={backAction} style={styles.TopNavigation} />
      <View>{renderDetail(data)}</View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  TopNavigation: {
    marginTop: 15,
  },
});

export default PostDetailScreen;
