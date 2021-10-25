import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainStackNavigator from './src/navigators/MainStackNavigator';
import {ApolloProvider} from '@apollo/client';
import {client} from './src/graphql/client';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import Toast from 'react-native-toast-message';

const App: React.VFC = () => {
  return (
    <React.Fragment>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <ApolloProvider client={client}>
          <NavigationContainer>
            <MainStackNavigator />
          </NavigationContainer>
        </ApolloProvider>
        <Toast ref={ref => Toast.setRef(ref)} />
      </ApplicationProvider>
    </React.Fragment>
  );
};

export default App;
