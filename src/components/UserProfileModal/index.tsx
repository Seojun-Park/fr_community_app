import {Text} from '@ui-kitten/components';
import React from 'react';
import {StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  getChatMessages_getChatMessages_data_Receiver,
  getChatMessages_getChatMessages_data_Sender,
} from '../../types/graphql';

interface IProps {
  isVisible: boolean;
  onClose: () => void;
  user:
    | getChatMessages_getChatMessages_data_Sender
    | getChatMessages_getChatMessages_data_Receiver
    | null;
}

const UserProfileModal: React.FC<IProps> = ({isVisible, onClose, user}) => {
  console.log(user);
  return (
    <Modal
      isVisible={isVisible}
      onBackButtonPress={onClose}
      onBackdropPress={onClose}
      style={styles.modal}>
      <SafeAreaView style={styles.screen}>
        <Text>avatar and block user will be added here</Text>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    margin: 0,
  },
  screen: {
    height: '50%',
    width: '95%',
    backgroundColor: 'white',
    padding: 30,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
});

export default UserProfileModal;
