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
import React, {useCallback, useEffect, useState} from 'react';
import {KeyboardAvoidingView, Platform, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Input} from '../../../../common/SharedStyles';
import {useInputState} from '../../../../hooks/useInput';
import {MarketStackParamList} from '../../../../navigators/Home/Market/MarketStackNavigator';
import {
  Content,
  ImageBox,
  ImageDeleteButton,
  ImageRow,
  ImageUploadButton,
  InputGroup,
  InputRow,
  OptionGroup,
  TitleBox,
} from '../styles';
import * as ImagePicker from 'react-native-image-picker';
import ImagePickerModal from '../../../../components/ImagePicker/ImagePickerModal';
import ImagePickerView from '../../../../components/ImagePicker/ImagePickerView';

interface IProps {
  route: {
    params: {
      userId: string;
      category: string;
    };
  };
}

interface ImageProps {
  filename: string;
  fileSize: number;
  type: string;
  uri: string;
  height: number;
  width: number;
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
  const [images, setImages] = useState<Array<ImageProps> | undefined>([]);

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

  useEffect(() => {
    if (pickerResponse && pickerResponse.assets) {
      for (let i = 0; i < pickerResponse.assets.length; i++) {
        setImages(prev => [...prev, pickerResponse.assets[i]]);
      }
    }
  }, [pickerResponse]);

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
            <ImageRow
              horizontal={true}
              contentContainerStyle={{alignItems: 'center'}}>
              {images?.map((item, idx) => {
                return (
                  <>
                    <ImageBox key={idx}>
                      <ImagePickerView uri={item} />
                    </ImageBox>
                    <ImageDeleteButton activeOpacity={0.5}>
                      <Icon
                        {...{width: 30, height: 30}}
                        name="trash-2-outline"
                        fill="gray"
                      />
                    </ImageDeleteButton>
                  </>
                );
              })}
              {images && images?.length < 5 && (
                <ImageUploadButton
                  height={'150px'}
                  width={'150px'}
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Icon
                    {...{height: 30, width: 30}}
                    name="image-outline"
                    fill="gray"
                  />
                </ImageUploadButton>
              )}
            </ImageRow>
            <View>
              <ImagePickerModal
                isVisible={modalVisible}
                onClose={() => setModalVisible(false)}
                onImageLibraryPress={onImageLibraryPress}
                onCameraPress={onCameraPress}
              />
            </View>
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
