import React, {useCallback, useRef, useState} from 'react';
import {useQuery} from '@apollo/client';
import {GET_MY_PROFILE} from '../../../graphql/query/sharedQuery';
import {
  getMyProfile as getMyProfileType,
  getMyProfileVariables,
  getMyProfile_getMyProfile_data_Board,
  getMyProfile_getMyProfile_data_Like,
  getMyProfile_getMyProfile_data_Market,
  getMyProfile_getMyProfile_data_Meets,
  getMyProfile_getMyProfile_data_Recruits,
  getMyProfile_getMyProfile_data_Rent,
} from '../../../types/graphql';
import {LoadingScreen, Screen} from '../../../common/SharedStyles';
import {
  AvatarBox,
  Container,
  Content,
  Head,
  InfoText,
  SectionRow,
  UserInfo,
} from './styles';
import Avatar from '../../../components/Avatar';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Divider, Icon, Text} from '@ui-kitten/components';
import {Transition, Transitioning} from 'react-native-reanimated';
import {profileMenuList} from '../../../common/menuList';
import {useNavigation} from '@react-navigation/core';
import {getDate} from '../../../common/getDate';

interface IProps {
  route: {
    params: {
      id: number;
      token: string;
    };
  };
}

const menu: Array<{filter: string; title: string}> = [
  {filter: 'mine', title: '내가 올린 글'},
  {filter: 'like', title: '저장한 글'},
];

const transition = (
  <Transition.Together>
    <Transition.In type="fade" durationMs={200} />
    <Transition.Change />
    <Transition.Out type="fade" durationMs={200} />
  </Transition.Together>
);

const ProfileScreen: React.FC<IProps> = ({route: {params}}) => {
  const {navigate} = useNavigation();
  const {id, token} = params;
  const ref = useRef();
  const [currentIndex, setCurrentIndex] = useState<number | null>();
  const [showIndex, setShowIndex] = useState<number | null>();
  const [boards, setBoards] = useState<
    getMyProfile_getMyProfile_data_Board[] | null
  >(null);
  const [rents, setRents] = useState<
    getMyProfile_getMyProfile_data_Rent[] | null
  >(null);
  const [markets, setMarkets] = useState<
    getMyProfile_getMyProfile_data_Market[] | null
  >(null);
  const [recruits, setRecruits] = useState<
    getMyProfile_getMyProfile_data_Recruits[] | null
  >(null);
  const [meets, setMeets] = useState<
    getMyProfile_getMyProfile_data_Meets[] | null
  >(null);
  const [likes, setLikes] =
    useState<getMyProfile_getMyProfile_data_Like | null>(null);
  const {data, loading} = useQuery<getMyProfileType, getMyProfileVariables>(
    GET_MY_PROFILE,
    {
      fetchPolicy: 'cache-and-network',
      skip: !token,
      variables: {token},
      onCompleted: ({getMyProfile}) => {
        const {success, error, data: completeData} = getMyProfile;
        if (success && completeData) {
          setBoards(completeData.Board);
          setRents(completeData.Rent);
          setMarkets(completeData.Market);
          setRecruits(completeData.Recruits);
          setMeets(completeData.Meets);
          setLikes(completeData.Like);
        } else {
          console.error(error);
        }
      },
    }
  );

  const renderList = useCallback(
    (category: string, filter: string) => {
      switch (category) {
        case 'market':
          return (
            <>
              {filter === 'mine' ? (
                markets && markets.length !== 0 ? (
                  markets.map((val, idx) => {
                    return (
                      <TouchableOpacity
                        key={idx}
                        style={styles.listRow}
                        onPress={() =>
                          navigate('PostDetail', {
                            userId: id,
                            id: val.id,
                            category: 'market',
                          })
                        }>
                        <Divider style={styles.dividerMargin} />
                        <View>
                          <Text>{val.title}</Text>
                          <Text category="s2" appearance="hint">
                            {getDate(val.createdAt)}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    );
                  })
                ) : (
                  <View>
                    <Divider style={styles.dividerMargin} />
                    <Text category="label" appearance="hint">
                      게시물이 없습니다
                    </Text>
                  </View>
                )
              ) : likes && likes.Markets && likes.Markets.length !== 0 ? (
                likes.Markets.map((val, idx) => {
                  return (
                    <TouchableOpacity
                      key={idx}
                      onPress={() =>
                        navigate('PostDetail', {
                          userId: id,
                          id: val.id,
                          category: 'market',
                        })
                      }>
                      <Divider style={styles.dividerMargin} />

                      <Text>{val.title}</Text>
                    </TouchableOpacity>
                  );
                })
              ) : (
                <View>
                  <Divider style={styles.dividerMargin} />
                  <Text category="label" appearance="hint">
                    게시물이 없습니다
                  </Text>
                </View>
              )}
            </>
          );
        case 'rent':
          return (
            <>
              {filter === 'mine' ? (
                rents && rents.length !== 0 ? (
                  rents.map((val, idx) => {
                    return (
                      <TouchableOpacity
                        key={idx}
                        onPress={() =>
                          navigate('PostDetail', {
                            userId: id,
                            id: val.id,
                            category: 'rent',
                          })
                        }>
                        <Divider style={styles.dividerMargin} />
                        <Text>{val.title}</Text>
                      </TouchableOpacity>
                    );
                  })
                ) : (
                  <View>
                    <Divider style={styles.dividerMargin} />
                    <Text category="label" appearance="hint">
                      게시물이 없습니다
                    </Text>
                  </View>
                )
              ) : likes && likes.Rents && likes.Rents.length !== 0 ? (
                likes.Rents.map((val, idx) => {
                  return (
                    <TouchableOpacity
                      key={idx}
                      onPress={() =>
                        navigate('PostDetail', {
                          userId: id,
                          id: val.id,
                          category: 'rent',
                        })
                      }>
                      <Divider style={styles.dividerMargin} />
                      <Text>{val.title}</Text>
                    </TouchableOpacity>
                  );
                })
              ) : (
                <View>
                  <Divider style={styles.dividerMargin} />
                  <Text category="label" appearance="hint">
                    게시물이 없습니다
                  </Text>
                </View>
              )}
            </>
          );
        case 'recruit':
          return (
            <>
              {filter === 'mine' ? (
                recruits && recruits.length !== 0 ? (
                  recruits.map((val, idx) => {
                    return (
                      <TouchableOpacity
                        key={idx}
                        onPress={() =>
                          navigate('PostDetail', {
                            userId: id,
                            id: val.id,
                            category: 'recruit',
                          })
                        }>
                        <Divider style={styles.dividerMargin} />
                        <Text>{val.title}</Text>
                      </TouchableOpacity>
                    );
                  })
                ) : (
                  <View>
                    <Divider style={styles.dividerMargin} />
                    <Text category="label" appearance="hint">
                      게시물이 없습니다
                    </Text>
                  </View>
                )
              ) : likes && likes.Recruits && likes.Recruits.length !== 0 ? (
                likes.Recruits.map((val, idx) => {
                  return (
                    <TouchableOpacity
                      key={idx}
                      onPress={() =>
                        navigate('PostDetail', {
                          userId: id,
                          id: val.id,
                          category: 'recruit',
                        })
                      }>
                      <Divider style={styles.dividerMargin} />
                      <Text>{val.title}</Text>
                    </TouchableOpacity>
                  );
                })
              ) : (
                <View>
                  <Divider style={styles.dividerMargin} />
                  <Text category="label" appearance="hint">
                    게시물이 없습니다
                  </Text>
                </View>
              )}
            </>
          );
        case 'board':
          return (
            <>
              {filter === 'mine' ? (
                boards && boards.length !== 0 ? (
                  boards.map((val, idx) => {
                    return (
                      <TouchableOpacity
                        key={idx}
                        onPress={() =>
                          navigate('PostDetail', {
                            userId: id,
                            id: val.id,
                            category: 'board',
                          })
                        }>
                        <Divider style={styles.dividerMargin} />
                        <View style={styles.listRow}>
                          <Text style={styles.titleStyle} numberOfLines={1}>
                            {val.title}
                          </Text>
                          <Text category="c2" appearance="hint">
                            {getDate(val.createdAt)}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    );
                  })
                ) : (
                  <View>
                    <Divider style={styles.dividerMargin} />
                    <Text category="label" appearance="hint">
                      게시물이 없습니다
                    </Text>
                  </View>
                )
              ) : likes && likes.Boards && likes.Boards.length !== 0 ? (
                likes.Boards.map((val, idx) => {
                  return (
                    <TouchableOpacity
                      key={idx}
                      onPress={() =>
                        navigate('PostDetail', {
                          userId: id,
                          id: val.id,
                          category: 'board',
                        })
                      }>
                      <Divider style={styles.dividerMargin} />
                      <Text>{val.title}</Text>
                    </TouchableOpacity>
                  );
                })
              ) : (
                <View>
                  <Divider style={styles.dividerMargin} />
                  <Text category="label" appearance="hint">
                    게시물이 없습니다
                  </Text>
                </View>
              )}
            </>
          );
        case 'meet':
          return (
            <>
              {filter === 'mine' ? (
                meets && meets.length !== 0 ? (
                  meets.map((val, idx) => {
                    return (
                      <TouchableOpacity
                        key={idx}
                        onPress={() =>
                          navigate('PostDetail', {
                            userId: id,
                            id: val.id,
                            category: 'meet',
                          })
                        }>
                        <Divider style={styles.dividerMargin} />

                        <Text>{val.title}</Text>
                      </TouchableOpacity>
                    );
                  })
                ) : (
                  <View>
                    <Divider style={styles.dividerMargin} />
                    <Text category="label" appearance="hint">
                      게시물이 없습니다
                    </Text>
                  </View>
                )
              ) : likes && likes.Meets && likes.Meets.length !== 0 ? (
                likes.Meets.map((val, idx) => {
                  return (
                    <TouchableOpacity
                      key={idx}
                      onPress={() =>
                        navigate('PostDetail', {
                          userId: id,
                          id: val.id,
                          category: 'meet',
                        })
                      }>
                      <Divider style={styles.dividerMargin} />
                      <Text>{val.title}</Text>
                    </TouchableOpacity>
                  );
                })
              ) : (
                <View>
                  <Divider style={styles.dividerMargin} />
                  <Text category="label" appearance="hint">
                    게시물이 없습니다
                  </Text>
                </View>
              )}
            </>
          );
        default:
          return null;
      }
    },
    [boards, meets, markets, rents, recruits, likes]
  );

  if (loading) {
    return (
      <LoadingScreen>
        <Text>loading...</Text>
      </LoadingScreen>
    );
  }

  return (
    <Screen>
      <Container>
        <Head>
          <AvatarBox style={styles.avatar}>
            <Avatar size={100} />
          </AvatarBox>
          <UserInfo>
            <InfoText category={'h5'}>
              {data?.getMyProfile.data?.nickname}
            </InfoText>
            <InfoText category={'s1'}>
              {data?.getMyProfile.data?.lastName}&ensp;
              {data?.getMyProfile.data?.firstName}
            </InfoText>
            <InfoText category={'s2'} appearance="hint">
              {data?.getMyProfile.data?.email}
            </InfoText>
          </UserInfo>
        </Head>
        <Divider />
        <Content>
          <Transitioning.View ref={ref} transition={transition}>
            {menu.map((item, idx) => {
              return (
                <TouchableOpacity
                  key={idx}
                  style={styles.cardContainer}
                  onPress={() => {
                    ref.current.animateNextTransition();
                    setCurrentIndex(idx === currentIndex ? null : idx);
                  }}
                  activeOpacity={0.9}>
                  <View style={styles.card}>
                    <SectionRow>
                      <Text
                        category="h5"
                        style={{
                          color: `${currentIndex === idx ? '#3f64f6' : 'gray'}`,
                        }}>
                        {item.title}
                      </Text>
                      <Icon
                        fill={currentIndex === idx ? '#3f64f6' : 'gray'}
                        {...{width: 24, height: 24}}
                        name={currentIndex === idx ? 'arrow-up' : 'arrow-down'}
                      />
                    </SectionRow>
                    {idx === currentIndex && (
                      <View style={styles.subCategoriesList}>
                        {profileMenuList.map(({title, category}, index) => {
                          return (
                            <TouchableOpacity
                              key={index}
                              style={styles.subCategoriesList}
                              onPress={() => {
                                ref.current.animateNextTransition();
                                setShowIndex(
                                  index === showIndex ? null : index
                                );
                              }}>
                              <Text
                                category="h6"
                                style={{
                                  color: `${
                                    showIndex === index ? '#3f64f6' : 'gray'
                                  }`,
                                }}>
                                {title}
                              </Text>
                              {index === showIndex &&
                                renderList(category, item.filter)}
                            </TouchableOpacity>
                          );
                        })}
                      </View>
                    )}
                  </View>
                  <Divider />
                </TouchableOpacity>
              );
            })}
          </Transitioning.View>
        </Content>
      </Container>
    </Screen>
  );
};

const styles = StyleSheet.create({
  avatar: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2.65,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  cardContainer: {
    flexGrow: 1,
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 24,
  },
  card: {
    flexGrow: 1,
    minHeight: 50,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  subCategoriesList: {
    width: '100%',
    padding: 10,
  },
  dividerMargin: {
    marginTop: 15,
    marginBottom: 15,
  },
  listRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleStyle: {
    width: '70%',
  },
});

export default ProfileScreen;
