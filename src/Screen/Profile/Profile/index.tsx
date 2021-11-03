import {useLazyQuery, useReactiveVar} from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Divider,
  Drawer,
  DrawerGroup,
  DrawerItem,
  Text,
} from '@ui-kitten/components';
import React, {useCallback, useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {getDate} from '../../../common/getDate';
import {Container} from '../../../common/SharedStyles';
import LoadingIndicator from '../../../components/LoadingIndicator';
import TopMenu from '../../../components/TopMenu';
import {myIdVar} from '../../../graphql/client';
import {GET_MY_PROFILE} from '../../../graphql/query/sharedQuery';
import {
  getMyProfile as getMyProfileType,
  getMyProfileVariables,
  getMyProfile_getMyProfile_data_Board,
  getMyProfile_getMyProfile_data_Like_Boards,
  getMyProfile_getMyProfile_data_Like_Markets,
  getMyProfile_getMyProfile_data_Like_Rents,
  getMyProfile_getMyProfile_data_Like_Meets,
  getMyProfile_getMyProfile_data_Market,
  getMyProfile_getMyProfile_data_Meets,
  getMyProfile_getMyProfile_data_Recruits,
  getMyProfile_getMyProfile_data_Rent,
  getMyProfile_getMyProfile_data_Like_Recruits,
} from '../../../types/graphql';
import {Content, ContentSection, Head, Intro, SectionTitle} from './styles';

const ProfileScreen: React.VFC = () => {
  const myId = useReactiveVar(myIdVar);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [secondSelectedIndex, setSecondSelectedIndex] = useState(null);
  const [getMyProfile, {data, loading, refetch}] = useLazyQuery<
    getMyProfileType,
    getMyProfileVariables
  >(GET_MY_PROFILE);

  const loadToken = useCallback(async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      getMyProfile({variables: {token}});
    }
  }, [getMyProfile]);

  useEffect(() => {
    loadToken();
  }, [loadToken]);

  console.log(data?.getMyProfile.data?.Like);

  if (loading && !data) {
    return (
      <SafeAreaView>
        <LoadingIndicator size="large" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView>
      <TopMenu
        title={`${data?.getMyProfile.data?.nickname}님의 프로필`}
        id={myId}
      />
      <View style={styles.scroll}>
        <Container style={styles.container}>
          <Head>
            <Text category={'h2'}>{data?.getMyProfile.data?.nickname}</Text>
            <View>
              <Text category={'s1'}>action</Text>
            </View>
          </Head>
          <Intro>
            <Text category="s1" style={styles.introText} appearance="hint">
              이&ensp;&ensp;름 : {data?.getMyProfile.data?.lastName}{' '}
              {data?.getMyProfile.data?.firstName}
            </Text>
            <Text category="s1" style={styles.introText} appearance="hint">
              이메일 : {data?.getMyProfile.data?.email}
            </Text>
          </Intro>
          <Divider />
          <Content>
            <ContentSection>
              <SectionTitle category={'h6'}>내가 저장한 글</SectionTitle>
              <Drawer
                selectedIndex={selectedIndex}
                onSelect={index => setSelectedIndex(index)}>
                <DrawerGroup title="자유게시판">
                  {data?.getMyProfile.data?.Like.Boards &&
                  data.getMyProfile.data.Like.Boards.length !== 0 ? (
                    data.getMyProfile.data.Like.Boards.map(
                      (item: getMyProfile_getMyProfile_data_Like_Boards) => {
                        return (
                          <DrawerItem
                            title={item.title}
                            accessoryRight={() => (
                              <View>
                                <Text category={'label'} appearance="hint">
                                  {getDate(item.createdAt)}
                                </Text>
                              </View>
                            )}
                          />
                        );
                      }
                    )
                  ) : (
                    <DrawerItem
                      style={styles.disabledSectionRow}
                      title="저장한 게시물이 없습니다"
                      disabled={true}
                    />
                  )}
                </DrawerGroup>
                <DrawerGroup title="중고거래">
                  {data?.getMyProfile.data?.Like.Markets &&
                  data.getMyProfile.data.Like.Markets.length !== 0 ? (
                    data.getMyProfile.data.Like.Markets.map(
                      (item: getMyProfile_getMyProfile_data_Like_Markets) => {
                        return <DrawerItem title={item.title} />;
                      }
                    )
                  ) : (
                    <DrawerItem
                      title="저장한 게시물이 없습니다"
                      disabled={true}
                    />
                  )}
                </DrawerGroup>
                <DrawerGroup title="내집찾기">
                  {data?.getMyProfile.data?.Like.Rents &&
                  data.getMyProfile.data.Like.Rents.length !== 0 ? (
                    data.getMyProfile.data.Like.Rents.map(
                      (item: getMyProfile_getMyProfile_data_Like_Rents) => {
                        return <DrawerItem title={item.title} />;
                      }
                    )
                  ) : (
                    <DrawerItem
                      title="저장한 게시물이 없습니다"
                      disabled={true}
                    />
                  )}
                </DrawerGroup>
                <DrawerGroup title="모임">
                  {data?.getMyProfile.data?.Like.Meets &&
                  data.getMyProfile.data.Like.Meets.length !== 0 ? (
                    data.getMyProfile.data.Like.Meets.map(
                      (item: getMyProfile_getMyProfile_data_Like_Meets) => {
                        return <DrawerItem title={item.title} />;
                      }
                    )
                  ) : (
                    <DrawerItem
                      title="저장한 게시물이 없습니다"
                      disabled={true}
                    />
                  )}
                </DrawerGroup>
                <DrawerGroup title="구인구직">
                  {data?.getMyProfile.data?.Like.Recruits &&
                  data.getMyProfile.data.Like.Recruits.length !== 0 ? (
                    data.getMyProfile.data.Like.Recruits.map(
                      (item: getMyProfile_getMyProfile_data_Like_Recruits) => {
                        return <DrawerItem title={item.title} />;
                      }
                    )
                  ) : (
                    <DrawerItem
                      title="저장한 게시물이 없습니다"
                      disabled={true}
                    />
                  )}
                </DrawerGroup>
              </Drawer>
            </ContentSection>
            <ContentSection>
              <SectionTitle category={'h6'}>내가 올린 글</SectionTitle>
              <Drawer
                selectedIndex={secondSelectedIndex}
                onSelect={index => setSecondSelectedIndex(index)}>
                <DrawerGroup title="자유게시판">
                  {data?.getMyProfile.data?.Board &&
                  data.getMyProfile.data.Board.length !== 0 ? (
                    data.getMyProfile.data.Board.map(
                      (item: getMyProfile_getMyProfile_data_Board) => {
                        return <DrawerItem title={item.title} />;
                      }
                    )
                  ) : (
                    <DrawerItem
                      style={styles.disabledSectionRow}
                      title="업로드한 게시물이 없습니다"
                      disabled={true}
                    />
                  )}
                </DrawerGroup>
                <DrawerGroup title="중고거래">
                  {data?.getMyProfile.data?.Market &&
                  data.getMyProfile.data.Market.length !== 0 ? (
                    data.getMyProfile.data.Market.map(
                      (item: getMyProfile_getMyProfile_data_Market) => {
                        return <DrawerItem title={item.title} />;
                      }
                    )
                  ) : (
                    <DrawerItem
                      title="업로드한 게시물이 없습니다"
                      disabled={true}
                    />
                  )}
                </DrawerGroup>
                <DrawerGroup title="내집찾기">
                  {data?.getMyProfile.data?.Rent &&
                  data.getMyProfile.data.Rent.length !== 0 ? (
                    data.getMyProfile.data.Rent.map(
                      (item: getMyProfile_getMyProfile_data_Rent) => {
                        return <DrawerItem title={item.title} />;
                      }
                    )
                  ) : (
                    <DrawerItem
                      title="업로드한 게시물이 없습니다"
                      disabled={true}
                    />
                  )}
                </DrawerGroup>
                <DrawerGroup title="모임">
                  {data?.getMyProfile.data?.Meets &&
                  data.getMyProfile.data.Meets.length !== 0 ? (
                    data.getMyProfile.data.Meets.map(
                      (item: getMyProfile_getMyProfile_data_Meets) => {
                        return <DrawerItem title={item.title} />;
                      }
                    )
                  ) : (
                    <DrawerItem
                      title="업로드한 게시물이 없습니다"
                      disabled={true}
                    />
                  )}
                </DrawerGroup>
                <DrawerGroup title="구인구직">
                  {data?.getMyProfile.data?.Recruits &&
                  data.getMyProfile.data.Recruits.length !== 0 ? (
                    data.getMyProfile.data.Recruits.map(
                      (item: getMyProfile_getMyProfile_data_Recruits) => {
                        return <DrawerItem title={item.title} />;
                      }
                    )
                  ) : (
                    <DrawerItem
                      title="업로드한 게시물이 없습니다"
                      disabled={true}
                    />
                  )}
                </DrawerGroup>
              </Drawer>
            </ContentSection>
          </Content>
        </Container>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0,
    paddingLeft: 10,
    paddingRight: 10,
  },
  scroll: {
    height: '100%',
  },
  introText: {
    paddingTop: 15,
  },
  disabledSectionRow: {},
});

export default ProfileScreen;
