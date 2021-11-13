import React, {useCallback, useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainStackNavigator from './src/navigators/Main/MainStackNavigator';
import {ApolloProvider} from '@apollo/client';
import {client} from './src/graphql/client';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import Toast from 'react-native-toast-message';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App: React.VFC = () => {
  const [id, setId] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const preload = useCallback(async () => {
    const savedId = await AsyncStorage.getItem('id');
    const savedToken = await AsyncStorage.getItem('token');
    setId(savedId);
    setToken(savedToken);
  }, []);

  useEffect(() => {
    preload();
  }, [preload]);

  return (
    <React.Fragment>
      <GestureHandlerRootView style={styles.container}>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={eva.light}>
          <ApolloProvider client={client}>
            <NavigationContainer>
              <MainStackNavigator id={id} token={token} />
            </NavigationContainer>
          </ApolloProvider>
          <Toast ref={ref => Toast.setRef(ref)} />
        </ApplicationProvider>
      </GestureHandlerRootView>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
