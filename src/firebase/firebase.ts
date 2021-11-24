import firebase from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDILaDg0LmHJ-KxHdMskcOb4rUoOAJ2Ab4',
  authDomain: 'fr-community.firebaseapp.com',
  projectId: 'fr-community',
  storageBucket: 'fr-community.appspot.com',
  messagingSenderId: '153013820480',
  appId: '1:153013820480:web:72401d72590036e79893a5',
  measurementId: 'G-JNK0056K1M',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
export {storage};
