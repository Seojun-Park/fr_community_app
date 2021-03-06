import {
  ApolloClient,
  InMemoryCache,
  makeVar,
  split,
  NormalizedCacheObject,
  HttpLink,
} from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getMainDefinition} from '@apollo/client/utilities';
import {onError} from '@apollo/client/link/error';
import {WebSocketLink} from '@apollo/client/link/ws';
import {setContext} from '@apollo/client/link/context';
import {persistCache, AsyncStorageWrapper} from 'apollo3-cache-persist';

export const isLoggedInVar = makeVar<boolean>(false);
export const myIdVar = makeVar<number>(0);

const cache = new InMemoryCache();

const persCache = async () =>
  await persistCache({
    cache,
    storage: new AsyncStorageWrapper(AsyncStorage),
  });

persCache();

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
    await AsyncStorage.removeItem('id');
    isLoggedInVar(false);
    myIdVar(0);
  } catch (err) {
    console.error(err.message);
  }
};

const wsLink = new WebSocketLink({
  // uri: 'ws://localhost:4000/graphql',
  uri: 'ws://127.0.0.1:4000/graphql',
  options: {
    connectionParams: () => ({
      id: myIdVar,
    }),
  },
});

const authLink = setContext((_, {headers}) => {
  return {
    headers: {
      ...headers,
      id: myIdVar(),
    },
  };
});

const onErrorLink = onError(({graphQLErrors, networkError}) => {
  if (graphQLErrors) {
    console.log('Graphql Error', graphQLErrors);
  }
  if (networkError) {
    console.log('Network Error', networkError);
  }
});

const httpLink = new HttpLink({
  // uri: 'http://localhost:4000/graphql',
  // uri: 'http://127.0.0.1:4000/graphql',
  uri: 'http://192.168.0.10:4000/graphql',
});

const httpLinks = authLink.concat(onErrorLink).concat(httpLink);

const splitLink = split(
  ({query}) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLinks
);

export const client = new ApolloClient<NormalizedCacheObject>({
  cache,
  link: splitLink,
});
