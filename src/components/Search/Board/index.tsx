import React from 'react';
import {Text, View} from 'react-native';

interface IProps {
  category: string;
  term: string;
}

const BoardSearch: React.FC<IProps> = ({category, term}) => {
  return (
    <View>
      <Text>search</Text>
    </View>
  );
};

export default BoardSearch;
