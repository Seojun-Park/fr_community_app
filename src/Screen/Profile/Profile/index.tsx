import {useLazyQuery, useReactiveVar} from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Divider, Text} from '@ui-kitten/components';
import React, {useCallback, useEffect} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {getDate} from '../../../common/getDate';
import {Container} from '../../../common/SharedStyles';
import LoadingIndicator from '../../../components/LoadingIndicator';
import TopMenu from '../../../components/TopMenu';
import {myIdVar} from '../../../graphql/client';
import {GET_MY_PROFILE} from '../../../graphql/query/sharedQuery';
import {
  getMyProfile as getMyProfileType,
  getMyProfileVariables,
  getMyProfile_getMyProfile_data_Like_Boards,
} from '../../../types/graphql';
import {
  Content,
  ContentSection,
  Head,
  Intro,
  SectionContent,
  SectionContentRow,
  SectionSubTitle,
  SectionTitle,
} from './styles';

const ProfileScreen: React.VFC = () => {
  const myId = useReactiveVar(myIdVar);
  const [getMyProfile, {data, loading}] = useLazyQuery<
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

  console.log(data);

  if (loading) {
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
      <ScrollView style={styles.scroll}>
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
              <SectionTitle category={'h6'}>저장 글</SectionTitle>
              <SectionSubTitle category={'s1'} appearance="hint">
                자유게시판
              </SectionSubTitle>
              <SectionContent>
                {data?.getMyProfile.data?.Like.Boards?.map(
                  (item: getMyProfile_getMyProfile_data_Like_Boards, idx) => {
                    return (
                      <SectionContentRow key={idx}>
                        <Text>{item.title}</Text>
                        <Text>{getDate(item.createdAt)}</Text>
                      </SectionContentRow>
                    );
                  }
                )}
              </SectionContent>
            </ContentSection>
          </Content>
        </Container>
      </ScrollView>
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
  sectionRow: {
    paddingLeft: 5,
  },
});

export default ProfileScreen;
