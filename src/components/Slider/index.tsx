import React, {useState} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import CarouselItem from './CarouselItem';
import CustomPaging from './Paging';

const {width} = Dimensions.get('screen');

interface SliderProps {
  data: Array<{url: string}>;
}

const CustomSlider: React.FC<SliderProps> = ({data}) => {
  const [slideIndex, setSlideIndex] = useState<number>(0);
  const settings = {
    sliderWidth: width,
    sliderHeight: width,
    itemWidth: width,
    data: data,
    renderItem: CarouselItem,
    hasParallaxImages: true,
  };

  return (
    <View style={styles.container}>
      <Carousel {...settings} onSnapToItem={index => setSlideIndex(index)} />
      <CustomPaging data={data} activeSlide={slideIndex} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
});

export default CustomSlider;
