import {ApolloClient, InMemoryCache, makeVar} from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const isLoggedInVar = makeVar<boolean>(false);
export const myIdVar = makeVar<number>(0);

export const logUserIn = async (token: string, id: number) => {
  try {
    await AsyncStorage.setItem('token', token);
    await AsyncStorage.multiSet([
      ['token', token],
      ['id', id.toString()],
    ]);
    isLoggedInVar(true);
    myIdVar(id);
  } catch (e) {
    console.error(e.message);
  }
};

export const userValidate = async (token: string) => {
  try {
    await AsyncStorage.setItem('validation', token);
  } catch (err) {
    console.error(err.message);
  }
};

export const logUserOut = async () => {
  try {
    await AsyncStorage.removeItem('token');
    isLoggedInVar(false);
    myIdVar(0);
  } catch (err) {
    console.error(err.message);
  }
};

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: 'http://localhost:4000/graphql',
});
