import React, {useCallback, useEffect, useRef, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Transitioning, Transition} from 'react-native-reanimated';
import {homeData} from '../homeData';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {LoadingScreen} from '../../../common/SharedStyles';
import LottieView from 'lottie-react-native';
import {useNavigation} from '@react-navigation/core';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {HomeStackParamList} from '../../../navigators/Home/HomeStackNavigator';

interface IProps {
  route: {
    params: {
      userId: number;
      token: string;
    };
  };
}

const transition = (
  <Transition.Together>
    <Transition.In type="fade" durationMs={200} />
    <Transition.Change />
    <Transition.Out type="fade" durationMs={200} />
  </Transition.Together>
);

type HomeScreenProps = NativeStackNavigationProp<
  HomeStackParamList,
  'HomeScreen'
>;

const HomeScreen: React.FC<IProps> = ({route: {params}}) => {
  const {userId, token} = params;
  const {navigate} = useNavigation<HomeScreenProps>();
  const [loading, setLoading] = useState<boolean>(true);
  const [currentIndex, setcurrentIndex] = useState<number | null>(null);
  const ref = useRef();

  useEffect(() => {
    if (token?.trim()) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [token]);

  const handleNavigate = useCallback(
    (category, subCategory) => {
      switch (category) {
        case 'Board':
          navigate('BoardListScreen', {
            userId: userId.toString(),
            category: subCategory,
          });
          break;
        case 'Market':
          navigate('MarketListScreen', {
            userId: userId.toString(),
            category: subCategory,
          });
          break;
        case 'Rent':
          navigate('RentListScreen', {
            userId: userId.toString(),
            category: subCategory,
          });
          break;
        case 'Recruit':
          navigate('RecruitListScreen', {
            userId: userId.toString(),
            category: subCategory,
          });
          break;
        case 'Community':
          navigate('CommunityListScreen', {
            userId: userId.toString(),
            category: subCategory,
          });
          break;
        default:
          break;
      }
    },
    [navigate, userId]
  );

  if (loading) {
    return (
      <LoadingScreen>
        <LottieView
          source={require('../../../asset/lotties/loading.json')}
          autoPlay
          loop
          style={{width: 150, height: 150}}
        />
        <LottieView
          source={require('../../../asset/lotties/loading-text.json')}
          autoPlay
          loop
          style={{width: 40, height: 40}}
        />
      </LoadingScreen>
    );
  }

  return (
    <ScrollView>
      <SafeAreaView>
        <Transitioning.View ref={ref} transition={transition}>
          {homeData.map(
            ({bg, color, title, category, subCategories, filter}, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={styles.cardContainer}
                  onPress={() => {
                    ref.current.animateNextTransition();
                    setcurrentIndex(index === currentIndex ? null : index);
                  }}
                  activeOpacity={0.9}>
                  <View style={[styles.card, {backgroundColor: bg}]}>
                    <Text style={[styles.heading, {color}]}>{title}</Text>
                    {index === currentIndex && (
                      <View style={styles.subCategoriesList}>
                        {subCategories.map((subCategory, idx) => (
                          <TouchableOpacity
                            key={subCategory}
                            onPress={() => {
                              handleNavigate(category, filter[idx]);
                              // navigate(`${category}ListScreen`, {
                              //   category: filter[idx],
                              //   userId,
                              // })
                            }}>
                            <Text style={[styles.body, {color}]}>
                              {subCategory}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    )}
                  </View>
                </TouchableOpacity>
              );
            }
          )}
        </Transitioning.View>
      </SafeAreaView>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  cardContainer: {
    flexGrow: 1,
    minHeight: 145,
  },
  card: {
    flexGrow: 1,
    minHeight: 70,
    paddingTop: 30,
    paddingBottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 38,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: -2,
  },
  body: {
    fontSize: 20,
    lineHeight: 20 * 1.5,
    textAlign: 'center',
  },
  subCategoriesList: {
    marginTop: 15,
  },
});

export default HomeScreen;
