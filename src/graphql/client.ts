import {ApolloClient, InMemoryCache, makeVar} from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const isLoggedInVar = makeVar<boolean>(false);

export const logUserIn = async (token: string) => {
  try {
    await AsyncStorage.setItem('token', token);
    isLoggedInVar(true);
  } catch (e) {
    console.error(e.message);
  }
};

export const logUserOut = async () => {
  try {
    await AsyncStorage.removeItem('token');
    isLoggedInVar(false);
  } catch (err) {
    console.error(err.message);
  }
};

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: 'http://localhost:4000/graphql',
});
