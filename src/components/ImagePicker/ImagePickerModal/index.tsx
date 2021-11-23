import {Icon} from '@ui-kitten/components';
import React from 'react';
import {SafeAreaView, Text, Pressable, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';

interface IProps {
  isVisible: boolean;
  onClose: () => void;
  onImageLibraryPress: () => void;
  onCameraPress: () => void;
}

const ImagePickerModal: React.FC<IProps> = ({
  isVisible,
  onClose,
  onImageLibraryPress,
}) => {
  return (
    <Modal
      isVisible={isVisible}
      onBackButtonPress={onClose}
      onBackdropPress={onClose}
      style={styles.modal}>
      <SafeAreaView style={styles.buttons}>
        <Pressable style={styles.button} onPress={onImageLibraryPress}>
          <Icon {...{height: 30, width: 30}} name="image-outline" fill="gray" />
          <Text style={styles.buttonText}>Library</Text>
        </Pressable>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  buttonIcon: {
    width: 30,
    height: 30,
    margin: 10,
  },
  buttons: {
    backgroundColor: 'white',
    flexDirection: 'row',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    height: 90,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'gray',
  },
});

export default ImagePickerModal;
