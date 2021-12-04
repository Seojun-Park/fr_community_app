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
import {Asset} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';

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
  const [pickerResponse, setPickerResponse] = useState<Asset[]>([]);
  const [images, setImages] = useState<Array<ImageProps> | undefined>([]);
  const [transferred, setTransferred] = useState<number>(0);
  const [imgUrl, setImgUrl] = useState<Array<string>>([]);

  const uploadImages = useCallback(async () => {
    for (let i = 0; i < pickerResponse.length; i++) {
      const {uri} = pickerResponse[i];
      const filename = uri?.substring(uri.lastIndexOf('/') + 1);
      const uploadUri =
        Platform.OS === 'ios' ? uri?.replace('file://', '') : uri;
      setTransferred(0);
      const task = storage()
        .ref(`/market/${userId}/${filename}`)
        .putFile(uploadUri);
      task.on(
        'state_changed',
        snapshot => {
          setTransferred(
            Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000
          );
        },
        err => console.log(err),
        () => {
          try {
            storage()
              .ref(`/market/${userId}/${filename}`)
              .getDownloadURL()
              .then(url => {
                setImgUrl(prev => [...prev, url]);
              });
          } catch (err) {
            console.log('uploading error', err.message);
          }
        }
      );
      try {
        await task;
      } catch (e) {
        console.log(e);
      }
    }
  }, [pickerResponse, userId]);

  const selectImages = useCallback(async () => {
    const options: ImageLibraryOptions = {
      selectionLimit: 5,
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 1000,
      maxWidth: 1000,
    };
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
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.log('Image picker error: ', response.errorMessage);
      } else if (response.errorCode) {
        console.log('Image picker error: ', response.errorCode);
      } else if (response.assets) {
        setPickerResponse(response.assets);
      }
    });
  }, []);

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
    try {
      // await uploadImages()
      await createMarketmutation({
        variables: {
          args: {
            UserId: parseInt(userId, 10),
            title: titleInput.value,
            content: contentInput.value,
            price: priceInput.value,
            status: 'onSale',
            location: locationInput.value,
            type,
          },
        },
      });
    } catch (err) {
      console.log(err);
    }
  }, [
    pickerResponse.length,
    uploadImages,
    titleInput.value,
    userId,
    contentInput.value,
    priceInput.value,
    locationInput.value,
    createMarketmutation,
    imgUrl,
    type,
  ]);

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
      <Content showsVerticalScrollIndicator={false}>
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
