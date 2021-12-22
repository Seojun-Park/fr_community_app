import {useQuery} from '@apollo/client';
import {useNavigation} from '@react-navigation/core';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  Icon,
  TopNavigation,
  TopNavigationAction,
  Text,
} from '@ui-kitten/components';
import React, {useCallback, useState} from 'react';
import {StyleSheet, KeyboardAvoidingView, Platform} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Loading from '../../../../components/Loading';
import {GET_MARKET} from '../../../../graphql/query/Market/marketQueries';
import {MarketStackParamList} from '../../../../navigators/Home/Market/MarketStackNavigator';
import {
  getMarket as getMarketType,
  getMarketVariables,
} from '../../../../types/graphql';
import {Container, Head, ImageBox, Title, Content} from './styles';
import CustomSlider from '../../../../components/Slider';

interface IProps {
  route: {
    params: {
      userId: string;
      postId: string;
      category: string;
    };
  };
}

type MarketDetailScreenProps = NativeStackNavigationProp<
  MarketStackParamList,
  'MarketList'
>;

const MarketDetailView: React.FC<IProps> = ({route: {params}}) => {
  const {postId, userId, category} = params;
  const {navigate} = useNavigation<MarketDetailScreenProps>();
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 80 : 0;
  const [imgUrl, setImgUrl] = useState<Array<{url: string}>>([]);

  const {data, loading} = useQuery<getMarketType, getMarketVariables>(
    GET_MARKET,
    {
      variables: {
        id: parseInt(postId, 10),
      },
      onCompleted: ({getMarket}) => {
        const {success, error, data: completeData} = getMarket;
        if (success && completeData) {
          if (completeData.Images) {
            completeData.Images.map(item =>
              setImgUrl(prev => [...prev, {url: item.url}])
            );
          }
        } else {
          console.log(error);
        }
      },
    }
  );

  const backAction = useCallback(() => {
    return (
      <TopNavigationAction
        icon={<Icon {...{width: 24, height: 24}} name="arrow-back" />}
        onPress={() => {
          navigate('MarketList', {
            userId,
            category,
            refreshing: true,
          });
        }}
      />
    );
  }, [userId, category, navigate]);

  console.log(data);

  if (loading) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={styles.screen}>
      <TopNavigation accessoryLeft={backAction} />
      <Container>
        <KeyboardAvoidingView
          behavior="position"
          keyboardVerticalOffset={keyboardVerticalOffset}
        />
        <Head>
          <ImageBox>
            <CustomSlider data={imgUrl} />
          </ImageBox>
        </Head>
        <Content>
          <Title>
            <Text category="h4">{data?.getMarket.data?.title}</Text>
          </Title>
          <Content>
            <Text category="s1" appearance="hint">
              {data?.getMarket.data?.status === 'onSale'
                ? '판매중'
                : '판매완료'}
            </Text>
            <Text category="p1">{data?.getMarket.data?.content}</Text>
          </Content>
        </Content>
      </Container>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    width: '100%',
    minHeight: '100%',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

export default MarketDetailView;
