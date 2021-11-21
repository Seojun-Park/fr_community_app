import React from 'react';
import {StyleSheet, Image, ImageSourcePropType} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

interface IProps {
  uri: ImageSourcePropType;
}

const ImagePickerView: React.FC<IProps> = ({uri}) => {
  return (
    <TouchableOpacity style={styles.imageBackground} activeOpacity={0.5}>
      {uri && <Image style={styles.avatarImage} source={uri} />}
    </TouchableOpacity>
  );
};

export default ImagePickerView;

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  avatarImage: {
    height: 200,
    width: 200,
    overflow: 'hidden',
    borderRadius: 4,
  },
});
