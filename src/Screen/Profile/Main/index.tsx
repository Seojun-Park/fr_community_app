import {useLazyQuery, useReactiveVar} from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Text} from '@ui-kitten/components';
import React, {useCallback, useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native';
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

  const handleAnimation = useCallback(() => {
    setShowSection(!showSection);
    if (showSection2) {
      setShowSection2(false);
    }
  }, [showSection, showSection2]);

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
      <Text>test</Text>
    </SafeAreaView>
  );
};

export default ProfileScreen;
