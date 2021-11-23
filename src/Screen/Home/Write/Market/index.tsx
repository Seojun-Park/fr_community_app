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
import {
  KeyboardAvoidingView,
  PermissionsAndroid,
  Platform,
  StyleSheet,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Button, Input} from '../../../../common/SharedStyles';
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
import {
  launchImageLibrary,
  ImageLibraryOptions,
} from 'react-native-image-picker';
import ImagePickerView from '../../../../components/ImagePicker/ImagePickerView';
import {useMutation} from '@apollo/client';
import {CREATE_MARKET} from '../../../../graphql/mutation/Market/MarketMutation';
import {
  createMarket as createMarketType,
  createMarketVariables,
} from '../../../../types/graphql';
import Toast from 'react-native-toast-message';
import storage from '@react-native-firebase/storage';
import {Asset} from 'react-native-image-picker';
import {utils} from '@react-native-firebase/app';

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
  const locationInput = useInputState('');
  const [type, setType] = useState(category);
  const [selectedIndex, setSelectedIndex] = useState(
    category === 'buy' ? 0 : 1
  );
  const [pickerResponse, setPickerResponse] = useState<Asset[]>();
  const [modalVisible, setModalVisible] = useState(false);
  const [images, setImages] = useState<Array<ImageProps> | undefined>([]);

  const getPlatformPath = useCallback(({path, uri}) => {
    return Platform.select({
      android: {value: path},
      ios: {value: uri},
    });
  }, []);

  const getFileName = useCallback((name, path) => {
    if (name != null) {
      return name;
    }

    if (Platform.OS === 'ios') {
      path = '~' + path.substring(path.indexOf('/Documents'));
    }
    return path.split('/').pop();
  }, []);

  const uploadImageToStorage = useCallback((path, name) => {
    // let fileUri = decodeURI(path);
    console.log(path);
    let reference = storage().ref(name);
    let task = reference.putFile(path);
    task
      .then(() => {
        console.log('Image uploaded to the bucket');
      })
      .catch(e => console.log('uploading image error => ', e, e.message));
  }, []);

  const onImageLibraryPress = useCallback(async () => {
    if (Platform.OS === 'android') {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAM_STORAGE,
        {
          title: '접근',
          message: '사진첩에 접근 권한이 필요합니다',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
    }
    const options: ImageLibraryOptions = {
      selectionLimit: 5,
      mediaType: 'photo',
      includeBase64: false,
    };
    // ImagePicker.launchImageLibrary(options, setPickerResponse);
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker', storage());
      } else if (response.errorMessage) {
        console.log('Image picker error: ', response.errorMessage);
      } else if (response.assets) {
        for (let i = 0; i < response.assets.length; i++) {
          let path = getPlatformPath(response.assets[i])!.value;
          let fileName = getFileName(response.assets[i].fileName, path);
          uploadImageToStorage(path, fileName);
        }
        setPickerResponse(response.assets);
      }
    });
  }, [getFileName, uploadImageToStorage, getPlatformPath]);

  const selectImages = useCallback(() => {
    const options: ImageLibraryOptions = {
      selectionLimit: 5,
      mediaType: 'photo',
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker', storage());
      } else if (response.errorMessage) {
        console.log('Image picker error: ', response.errorMessage);
      } else if (response.assets) {
        setPickerResponse(response.assets);
      }
    });
  }, []);

  const uploadImages = useCallback(async () => {
    if (pickerResponse) {
      pickerResponse.map(async item => {
        const reference = storage().ref(`Market/${userId}/${item.fileName}`);
        await reference.putString(item.uri!);
        await reference.putFile(item.uri!);
        // const task = storage()
        //   .ref(`Market/${userId}/${item.fileName}`)
        //   .putFile(pathTofile);
        // task.on('state_changed', snapshot => {});
      });
    }
  }, [pickerResponse, userId]);

  const backAction = () => (
    <TopNavigationAction
      icon={<Icon {...{width: 24, height: 24}} name="arrow-back" />}
      onPress={() => goBack()}
    />
  );

  const [createMarketmutation] = useMutation<
    createMarketType,
    createMarketVariables
  >(CREATE_MARKET, {
    onCompleted: ({createMarket}) => {
      const {success, error} = createMarket;
      if (success) {
        navigate('MarketList', {userId, category, refreshing: true});
        return (
          <>
            {Toast.show({
              type: 'success',
              position: 'bottom',
              text1: '게시물이 등록 되었습니다',
            })}
          </>
        );
      } else {
        console.log(error);
      }
    },
  });

  const handleSubmit = useCallback(async () => {
    uploadImages();
  }, [uploadImages]);

  // const handleSubmit = useCallback(async () => {
  //   await createMarketmutation({
  //     variables: {
  //       args: {
  //         UserId: parseInt(userId, 10),
  //         title: titleInput.value,
  //         content: contentInput.value,
  //         price: priceInput.value,
  //         location: locationInput.value,
  //         type: category,
  //         status: 'onSale',
  //       },
  //     },
  //   });
  // }, [
  //   titleInput,
  //   userId,
  //   contentInput,
  //   priceInput,
  //   category,
  //   locationInput,
  //   createMarketmutation,
  // ]);

  useEffect(() => {
    if (pickerResponse) {
      for (let i = 0; i < pickerResponse.length; i++) {
        setImages(prev => [...prev, pickerResponse[i]]);
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
            <InputRow>
              <Input {...locationInput} status="primary" label="장소" />
            </InputRow>
            <Text category="label" appearance="hint">
              이미지 (최대 5장)
            </Text>
            <ImageRow
              horizontal={true}
              contentContainerStyle={{alignItems: 'center'}}>
              {images?.map((item, idx) => {
                return (
                  <React.Fragment key={idx}>
                    <ImageBox>
                      <ImagePickerView uri={item} />
                    </ImageBox>
                    <ImageDeleteButton activeOpacity={0.5}>
                      <Icon
                        {...{width: 25, height: 25}}
                        name="trash-2-outline"
                        fill="white"
                      />
                    </ImageDeleteButton>
                  </React.Fragment>
                );
              })}
              {images && images?.length < 5 && (
                <ImageUploadButton
                  height={'150px'}
                  width={'150px'}
                  // onPress={() => setModalVisible(!modalVisible)}
                  onPress={selectImages}>
                  <Icon
                    {...{height: 30, width: 30}}
                    name="image-outline"
                    fill="gray"
                  />
                </ImageUploadButton>
              )}
            </ImageRow>
            <Button style={styles.submitButton} onPress={handleSubmit}>
              올리기
            </Button>
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
  submitButton: {
    marginTop: 20,
  },
});

export default MarketWriteScreen;
