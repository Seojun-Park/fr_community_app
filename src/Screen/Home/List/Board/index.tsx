import React, {useCallback, useEffect, useState} from 'react';
import {RefreshControl, StyleSheet, Text, View} from 'react-native';
import {
  Divider,
  Icon,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import {useNavigation} from '@react-navigation/core';
import {Screen} from '../../../../common/SharedStyles';
import {useQuery} from '@apollo/client';
import {GET_BOARDS_BY_CATEGORY} from '../../../../graphql/query/sharedQuery';
import {
  getBoardsByCategory,
  getBoardsByCategoryVariables,
} from '../../../../types/graphql';
import Loading from '../../../../components/Loading';
import {List, ListItem} from '@ui-kitten/components';
import {ListView, SearchView} from '../styles';
import {getDateWithoutYear} from '../../../../common/getDate';
import {BoardStackParamList} from '../../../../navigators/Home/Board/BoardStackNavigation';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

interface IProps {
  route: {
    params: {
      userId: string;
      category: string;
      refreshing?: boolean;
    };
  };
}

type BoardListScreenProps = NativeStackNavigationProp<
  BoardStackParamList,
  'BoardDetail'
>;

const BoardListScreen: React.FC<IProps> = ({route: {params}}) => {
  const {navigate, goBack} = useNavigation<BoardListScreenProps>();
  const {userId, category, refreshing} = params;
  const [quantity, setQuantity] = useState<number>(12);
  const {data, loading, fetchMore, refetch} = useQuery<
    getBoardsByCategory,
    getBoardsByCategoryVariables
  >(GET_BOARDS_BY_CATEGORY, {variables: {category, loadQuantity: quantity}});

  useEffect(() => {
    if (refreshing) {
      refetch();
    }
  }, [refreshing, refetch]);

  const backAction = () => (
    <TopNavigationAction
      icon={<Icon {...{width: 24, height: 24}} name="arrow-back" />}
      onPress={() => goBack()}
    />
  );

  const renderRight = useCallback(time => {
    return (
      <View>
        <Text>{getDateWithoutYear(time)}</Text>
      </View>
    );
  }, []);

  const renderItem = useCallback(
    ({item, index}) => {
      return (
        <ListItem
          title={`${item.title}`}
          style={styles.listItem}
          onPress={() => {
            navigate('BoardDetail', {
              postId: item.id,
              userId,
            });
          }}
          accessoryRight={() => renderRight(item.createdAt)}
        />
      );
    },
    [renderRight, navigate, userId]
  );

  if (loading) {
    return <Loading />;
  }

  return (
    <Screen>
      <TopNavigation accessoryLeft={backAction} style={styles.TopNavigation} />
      <SearchView>
        <Text>Search</Text>
      </SearchView>
      <ListView>
        {data ? (
          <List
            data={data?.getBoardsByCategory.data}
            renderItem={renderItem}
            ItemSeparatorComponent={Divider}
            style={styles.container}
            refreshControl={
              <RefreshControl
                refreshing={false}
                onRefresh={() => {
                  setQuantity(quantity * 2);
                  fetchMore({
                    variables: {
                      category,
                      loadQuantity: quantity,
                    },
                  });
                }}
              />
            }
          />
        ) : (
          <Text>게시 글이 없습니다</Text>
        )}
      </ListView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  TopNavigation: {
    marginTop: 15,
  },
  container: {
    minHeight: 200,
  },
  listItem: {
    minHeight: 50,
  },
});

export default BoardListScreen;
