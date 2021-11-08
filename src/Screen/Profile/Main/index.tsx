import {useLazyQuery, useQuery, useReactiveVar} from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Divider, Layout, Text} from '@ui-kitten/components';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import Avatar from '../../../components/Avatar';
import LoadingIndicator from '../../../components/LoadingIndicator';
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
import {
  AvatarBox,
  Container,
  Content,
  ContentSection,
  Intro,
  IntroBox,
  IntroBoxHead,
  SectionBody,
  SectionHead,
} from './styles';
import {Transition, Transitioning} from 'react-native-reanimated';

interface IProps {
  route: {
    params: {
      id: number;
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

const ProfileScreen: React.FC<IProps> = ({route: {params}}) => {
  console.log(params);
  const {token} = params;
  const [currentIndex, setCurrentIndex] = useState(null);
  const ref = useRef();

  const {data, loading, refetch} = useQuery<
    getMyProfileType,
    getMyProfileVariables
  >(GET_MY_PROFILE, {variables: {token}});

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
      <Container>
        <Layout style={styles.layout} level={'3'}>
          <Intro>
            <AvatarBox>
              <Avatar size={40} />
            </AvatarBox>
            <IntroBox>
              <IntroBoxHead>
                <Text category="h4">
                  {data?.getMyProfile?.data?.lastName}{' '}
                  {data?.getMyProfile?.data?.firstName}
                </Text>
                <Text>action</Text>
              </IntroBoxHead>
              <Text category="s1">{data?.getMyProfile?.data?.email}</Text>
            </IntroBox>
          </Intro>
          <Divider />
          <Content>
            <ContentSection>
              <SectionHead>
                <Text category="h6">내가 올린 글</Text>
              </SectionHead>
              <SectionBody />
            </ContentSection>
          </Content>
        </Layout>
      </Container>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  layout: {
    padding: 5,
  },
  icon: {
    width: 50,
    height: 50,
  },
});

export default ProfileScreen;
