import {useLazyQuery, useQuery} from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useCallback, useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {Container} from '../../../common/SharedStyles';
import {logUserIn} from '../../../graphql/client';
import {GET_ME} from '../../../graphql/query/sharedQuery';
import {AuthStackParamList} from '../../../navigators/AuthStackNavigator';
import {getMe, getMeVariables} from '../../../types/graphql';
import LoadingIndicator from '../../LoadingIndicator';

type ValidateScreenProps = NativeStackNavigationProp<
  AuthStackParamList,
  'Validate'
>;

const ValidateScreen: React.VFC = () => {
  const [getMe, {data, loading, refetch}] = useLazyQuery<getMe, getMeVariables>(
    GET_ME,
  );
  const [token, setToken] = useState<string>();

  const loadToken = useCallback(async () => {
    const storageToken = await AsyncStorage.getItem('validation');
    if (storageToken) {
      setToken(storageToken);
      getMe({
        variables: {
          token: storageToken,
        },
      });
    }
  }, [getMe]);

  useEffect(() => {
    loadToken();
  }, [loadToken]);

  useEffect(() => {
    if (data && data.getMe.data?.verified) {
      if (token) {
        logUserIn(token);
      }
    }
  }, [data, token]);

  console.log(data);

  return (
    <Container>
      <Text>validate</Text>
      {loading ? <LoadingIndicator size="small" /> : <Text>data</Text>}
    </Container>
  );
};

export default ValidateScreen;
