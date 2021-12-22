import React from 'react';
import {StyleSheet} from 'react-native';
import {Pagination} from 'react-native-snap-carousel';

interface PagingProps {
  data: Array<any>;
  activeSlide: any;
}

const CustomPaging: React.FC<PagingProps> = ({data, activeSlide}) => {
  const settings = {
    dotsLength: data.length,
    activeDotIndex: activeSlide,
    containerStyle: styles.dotContainer,
    dotStyle: styles.dotStyle,
    inactiveDotStyle: styles.inactiveDotStyle,
    inactiveDotOpacity: 0.4,
    inactiveDotScale: 0.6,
  };
  return <Pagination {...settings} />;
};

const styles = StyleSheet.create({
  dotContainer: {},
  dotStyle: {
    width: 8,
    height: 8,
    borderRadius: 5,
    backgroundColor: 'gray',
  },
  inactiveDotStyle: {
    backgroundColor: 'gray',
  },
});

export default CustomPaging;
