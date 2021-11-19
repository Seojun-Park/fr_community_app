import {useNavigation} from '@react-navigation/core';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  Divider,
  Icon,
  Radio,
  Text,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import React, {useCallback, useState} from 'react';
import {KeyboardAvoidingView, Platform, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Input} from '../../../../common/SharedStyles';
import {useInputState} from '../../../../hooks/useInput';
import {MarketStackParamList} from '../../../../navigators/Home/Market/MarketStackNavigator';
import {Content, InputGroup, InputRow, OptionGroup, TitleBox} from '../styles';
import * as ImagePicker from 'react-native-image-picker';
import ImagePickerModal from '../../../../components/ImagePicker';

interface IProps {
  route: {
    params: {
      userId: string;
      category: string;
    };
  };
}

type MarketWriteScreenProps = NativeStackNavigationProp<
  MarketStackParamList,
  'MarketWrite'
>;

const MarketWriteScreen: React.FC<IProps> = ({route: {params}}) => {
  const {navigate, goBack} = useNavigation<MarketWriteScreenProps>();
  const {userId, category} = params;
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 80 : 0;
  const titleInput = useInputState('');
  const contentInput = useInputState('');
  const priceInput = useInputState();
  const [type, setType] = useState(category);
  const [selectedIndex, setSelectedIndex] = useState(
    category === 'buy' ? 0 : 1
  );
  const [pickerResponse, setPickerResponse] =
    useState<ImagePicker.ImagePickerResponse>();
  const [modalVisible, setModalVisible] = useState(false);

  const onImageLibraryPress = useCallback(() => {
    const options: ImagePicker.ImageLibraryOptions = {
      selectionLimit: 5,
      mediaType: 'photo',
      includeBase64: false,
    };
    ImagePicker.launchImageLibrary(options, setPickerResponse);
  }, []);

  const onCameraPress = useCallback(() => {
    const options: ImagePicker.CameraOptions = {
      saveToPhotos: true,
      mediaType: 'photo',
      includeBase64: false,
    };
    ImagePicker.launchCamera(options, setPickerResponse);
  }, []);

  const backAction = () => (
    <TopNavigationAction
      icon={<Icon {...{width: 24, height: 24}} name="arrow-back" />}
      onPress={() => goBack()}
    />
  );

  return (
    <SafeAreaView style={styles.screen}>
      <TopNavigation accessoryLeft={backAction} />
      <Content>
        <KeyboardAvoidingView
          behavior="position"
          keyboardVerticalOffset={keyboardVerticalOffset}>
          <TitleBox>
            <Text category="h2">중고 글쓰기</Text>
          </TitleBox>
          <Divider style={styles.dividerMargin} />
          <InputGroup>
            <InputRow>
              <Input {...titleInput} status="primary" label="제목" />
            </InputRow>
            <InputRow>
              <Input {...contentInput} status="primary" label="본문" />
            </InputRow>
            <InputRow>
              <Input
                {...priceInput}
                status="primary"
                placeholder="&#8364;"
                label="가격"
              />
            </InputRow>
            <Text category="label" appearance="hint">
              타입
            </Text>
            <InputRow>
              <OptionGroup
                selectedIndex={selectedIndex}
                onChange={index => {
                  setSelectedIndex(index);
                  setType(index === 0 ? 'buy' : 'sell');
                }}>
                <Radio>삽니다</Radio>
                <Radio>팝니다</Radio>
              </OptionGroup>
            </InputRow>
            <InputRow>
              <ImagePickerModal
                isVisible={modalVisible}
                onClose={() => setModalVisible(false)}
                onImageLibraryPress={onImageLibraryPress}
                onCameraPress={onCameraPress}
              />
            </InputRow>
          </InputGroup>
        </KeyboardAvoidingView>
      </Content>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: 'white',
    alignItems: 'center',
  },
  dividerMargin: {
    marginTop: 5,
    marginBottom: 15,
  },
});

export default MarketWriteScreen;
