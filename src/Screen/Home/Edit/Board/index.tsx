import React, {useCallback} from 'react';
import {
  Divider,
  Icon,
  Text,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {BoardStackParamList} from '../../../../navigators/Home/Board/BoardStackNavigation';
import {useNavigation} from '@react-navigation/core';
import {KeyboardAvoidingView, Platform, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  Container,
  Content,
  InputGroup,
  InputRow,
  TitleBox,
  WriteRow,
} from '../styles';
import {
  editBoard as editBoardType,
  editBoardVariables,
  getBoard_getBoard_data,
} from '../../../../types/graphql';
import {useInputState} from '../../../../hooks/useInput';
import {Button, Input} from '../../../../common/SharedStyles';
import {useMutation} from '@apollo/client';
import {EDIT_BOARD} from '../../../../graphql/mutation/board/BoardMutation';
import Toast from 'react-native-toast-message';

interface IProps {
  route: {
    params: {
      userId: string;
      category: string;
      postId: string;
      data: getBoard_getBoard_data;
    };
  };
}

type EditBoardScreenProps = NativeStackNavigationProp<
  BoardStackParamList,
  'BoardEdit'
>;

const EditBoardScreen: React.FC<IProps> = ({route: {params}}) => {
  const {navigate} = useNavigation<EditBoardScreenProps>();
  const {userId, category, postId, data} = params;
  const titleInput = useInputState(data.title);
  const contentInput = useInputState(data.content);
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 80 : 0;

  const [editBoardMutation] = useMutation<editBoardType, editBoardVariables>(
    EDIT_BOARD,
    {
      onCompleted: ({editBoard}) => {
        const {success, error} = editBoard;
        if (success) {
          navigate('BoardDetail', {userId, postId, refreshing: true});
          return (
            <>
              {Toast.show({
                type: 'success',
                position: 'bottom',
                text1: '게시물이 수정 되었습니다',
              })}
            </>
          );
        } else {
          console.log(error);
        }
      },
    }
  );

  const backAction = useCallback(
    () => (
      <TopNavigationAction
        icon={<Icon {...{width: 24, height: 24}} name="arrow-back" />}
        onPress={() =>
          navigate('BoardList', {
            userId,
            category,
            refreshing: true,
          })
        }
      />
    ),
    [category, navigate, userId]
  );

  const handleSubmit = useCallback(async () => {
    await editBoardMutation({
      variables: {
        args: {
          boardId: parseInt(postId, 10),
          title: titleInput.value,
          content: contentInput.value,
        },
      },
    });
  }, [postId, titleInput, contentInput, editBoardMutation]);

  return (
    <SafeAreaView style={styles.screen}>
      <TopNavigation accessoryLeft={backAction} />
      <Container>
        <KeyboardAvoidingView
          behavior="position"
          keyboardVerticalOffset={keyboardVerticalOffset}>
          <TitleBox>
            <Text category="h2">수정 하기</Text>
          </TitleBox>
          <Content>
            <WriteRow>
              <Input {...titleInput} label="제목" />
            </WriteRow>
            <Divider style={styles.dividerMargin} />
            <InputGroup>
              <InputRow>
                <Input
                  {...contentInput}
                  label="본문"
                  multiline={true}
                  numberOfLines={5}
                />
              </InputRow>
            </InputGroup>
            <Button onPress={handleSubmit}>수정하기</Button>
          </Content>
        </KeyboardAvoidingView>
      </Container>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  dividerMargin: {
    marginTop: 20,
    marginBottom: 20,
  },
});

export default EditBoardScreen;
