import {useLazyQuery, useReactiveVar} from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Layout, Text} from '@ui-kitten/components';
import React, {useCallback, useEffect, useState} from 'react';
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
import {AvatarBox, Container, Content, Intro, IntroBox} from './styles';

const ProfileScreen: React.VFC = () => {
  const myId = useReactiveVar(myIdVar);
  const [showSection, setShowSection] = useState(false);
  const [showSection2, setShowSection2] = useState(false);
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
      <Container>
        <Layout style={styles.layout} level={'3'}>
          <Intro>
            <AvatarBox>
              <Avatar
                ImageComponent={() => {
                  return <Avatar size={40} />;
                }}
              />
            </AvatarBox>
            <IntroBox>
              <Text category="h4">
                {data?.getMyProfile?.data?.lastName}{' '}
                {data?.getMyProfile?.data?.firstName}
              </Text>
              <Text category="s1">{data?.getMyProfile?.data?.email}</Text>
            </IntroBox>
          </Intro>
          <Content />
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
