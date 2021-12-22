import React from 'react';
import {ParallaxImage} from 'react-native-snap-carousel';
import {StyleSheet, Platform, View} from 'react-native';

interface CarouselProps {
  item: {
    url: string;
  };
}

const CarouselItem: React.FC<CarouselProps> = ({item}, parallaxProps) => {
  return (
    <View style={styles.container}>
      <ParallaxImage
        source={{uri: item.url}} /* the source of the image */
        containerStyle={styles.imageContainer}
        style={styles.image}
        {...parallaxProps} /* pass in the necessary props */
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
  item: {
    width: '100%',
  },
  imageContainer: {
    flex: 1,
    backgroundColor: '#eeeeee',
    marginBottom: Platform.select({ios: 0, android: 1}), //handle rendering bug.
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'contain',
  },
});

export default CarouselItem;
