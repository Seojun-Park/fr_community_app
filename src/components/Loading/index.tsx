import React from 'react';
import {LoadingScreen} from '../../common/SharedStyles';
import LottieView from 'lottie-react-native';

const Loading: React.VFC = () => (
  <LoadingScreen>
    <LottieView
      source={require('../../asset/lotties/loading.json')}
      autoPlay
      loop
      style={{width: 150, height: 150}}
    />
    <LottieView
      source={require('../../asset/lotties/loading-text.json')}
      autoPlay
      loop
      style={{width: 40, height: 40}}
    />
  </LoadingScreen>
);

export default Loading;
