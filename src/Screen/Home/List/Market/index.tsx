import {useQuery} from '@apollo/client';
import {useNavigation} from '@react-navigation/core';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  Divider,
  Icon,
  List,
  ListItem,
  Text,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import React, {useCallback, useEffect, useState} from 'react';
import {RefreshControl, StyleSheet, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {getDateWithoutYear} from '../../../../common/getDate';
import {Screen} from '../../../../common/SharedStyles';
import {GET_MARKETS_BY_CATEGORY} from '../../../../graphql/query/Market/marketQueries';
import {
  getMarketsByCategory as getMarketsByCategoryType,
  getMarketsByCategoryVariables,
} from '../../../../types/graphql';
import {MarketStackParamList} from '../../../../navigators/Home/Market/MarketStackNavigator';
import Loading from '../../../../components/Loading';
import {EmptyView, SearchView} from '../styles';
import {SafeAreaView} from 'react-native-safe-area-context';

interface IProps {
  route: {
    params: {
      userId: string;
      category: string;
      refreshing?: boolean;
    };
  };
}

type MarketListScreenProps = NativeStackNavigationProp<
  MarketStackParamList,
  'MarketList'
>;

const MarketListScreen: React.FC<IProps> = ({route: {params}}) => {
  const {navigate, goBack} = useNavigation<MarketListScreenProps>();
  const {userId, category, refreshing} = params;
  const [quantity, setQuantity] = useState<number>(12);

  const {data, loading, refetch, fetchMore} = useQuery<
    getMarketsByCategoryType,
    getMarketsByCategoryVariables
  >(GET_MARKETS_BY_CATEGORY, {
    variables: {category, load: quantity},
    fetchPolicy: 'cache-and-network',
  });

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

  const topNavigationRenderRight = useCallback(() => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigate('MarketWrite', {userId, category});
        }}>
        <Icon {...{width: 24, height: 24}} name="plus-outline" fill="black" />
      </TouchableOpacity>
    );
  }, [navigate, userId, category]);

  const renderRight = useCallback(time => {
    return (
      <View>
        <Text>{getDateWithoutYear(time)}</Text>
      </View>
    );
  }, []);

  const renderItem = useCallback(
    ({item}) => {
      return (
        <ListItem
          title={`${item.title}`}
          style={styles.listItem}
          onPress={() => {
            navigate('MarketDetail', {
              postId: item.id,
              userId,
              category,
            });
          }}
          accessoryRight={() => renderRight(item.createdAt)}
        />
      );
    },
    [renderRight, navigate, userId, category]
  );

  if (loading) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={styles.screen}>
      <TopNavigation
        accessoryLeft={backAction}
        accessoryRight={topNavigationRenderRight}
      />
      <SearchView>
        <Divider />
        {data?.getMarketsByCategory?.data &&
        data.getMarketsByCategory.data.length !== 0 ? (
          <List
            data={data.getMarketsByCategory.data}
            renderItem={renderItem}
            ItemSeparatorComponent={Divider}
            refreshControl={
              <RefreshControl
                refreshing={false}
                onRefresh={() => {
                  setQuantity(quantity * 2);
                  fetchMore({
                    variables: {
                      category,
                      load: quantity,
                    },
                  });
                }}
              />
            }
          />
        ) : (
          <EmptyView>
            <Text>게시글이 없습니다</Text>
          </EmptyView>
        )}
      </SearchView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    height: '100%',
    backgroundColor: 'white',
  },
  container: {
    minHeight: 200,
  },
  listItem: {
    minHeight: 50,
  },
});

export default MarketListScreen;
