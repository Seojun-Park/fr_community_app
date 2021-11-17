import React, {useCallback} from 'react';
import {
  Divider,
  Icon,
  Text,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import {Button, Input} from '../../../../common/SharedStyles';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {BoardStackParamList} from '../../../../navigators/Home/Board/BoardStackNavigation';
import {useNavigation} from '@react-navigation/core';
import {Content, InputGroup, InputRow, TitleBox} from '../styles';
import {useInputState} from '../../../../hooks/useInput';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import {useMutation} from '@apollo/client';
import {CREATE_BOARD} from '../../../../graphql/mutation/sharedMutation';
import {
  createBoard as createBoardType,
  createBoardVariables,
} from '../../../../types/graphql';
import Toast from 'react-native-toast-message';
import Loading from '../../../../components/Loading';

interface IProps {
  route: {
    params: {
      userId: string;
      category: string;
    };
  };
}

type BoardWriteScreenProps = NativeStackNavigationProp<
  BoardStackParamList,
  'BoardWrite'
>;

const BoardWriteScreen: React.FC<IProps> = ({route: {params}}) => {
  const {navigate, goBack} = useNavigation<BoardWriteScreenProps>();
  const {userId, category} = params;
  const titleInput = useInputState();
  const contentInput = useInputState();
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 80 : 0;

  const [createBoardMutation] = useMutation<
    createBoardType,
    createBoardVariables
  >(CREATE_BOARD, {
    onCompleted: ({createBoard}) => {
      const {success, error} = createBoard;
      if (success) {
        titleInput.onChangeText('');
        contentInput.onChangeText('');
        navigate('BoardList', {userId, category, refreshing: true});
        return (
          <>
            {Toast.show({
              type: 'success',
              position: 'bottom',
              text1: '게시물이 생성 되었습니다',
            })}
          </>
        );
      } else {
        console.log(error);
      }
    },
  });

  const backAction = () => (
    <TopNavigationAction
      icon={<Icon {...{width: 24, height: 24}} name="arrow-back" />}
      onPress={() => goBack()}
    />
  );

  const handleSubmit = useCallback(async () => {
    if (!titleInput.value.trim()) {
      return (
        <>
          {Toast.show({
            type: 'error',
            position: 'bottom',
            text1: '제목을 입력해 주세요',
          })}
        </>
      );
    }
    if (!contentInput.value.trim()) {
      return (
        <>
          {Toast.show({
            type: 'error',
            position: 'bottom',
            text1: '내용을 입력해 주세요',
          })}
        </>
      );
    }
    await createBoardMutation({
      variables: {
        args: {
          title: titleInput.value,
          content: contentInput.value,
          UserId: parseInt(userId, 10),
          category,
        },
      },
    });
  }, [userId, titleInput, contentInput, createBoardMutation, category]);

  if (!userId) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={styles.screen}>
      <TopNavigation accessoryLeft={backAction} />
      <Content>
        <KeyboardAvoidingView
          behavior="position"
          keyboardVerticalOffset={keyboardVerticalOffset}>
          <TitleBox>
            <Text category="h2">글쓰기</Text>
          </TitleBox>
          <Divider style={styles.dividerMargin} />
          <InputGroup>
            <InputRow>
              <Input status="primary" {...titleInput} label="제목" />
            </InputRow>
            <InputRow>
              <Input
                status="primary"
                {...contentInput}
                label="본문"
                multiline={true}
                numberOfLines={5}
              />
            </InputRow>
          </InputGroup>
          <Button onPress={handleSubmit}>올리기</Button>
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

export default BoardWriteScreen;
