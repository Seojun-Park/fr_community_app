import {useMutation, useQuery} from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useCallback, useEffect, useState} from 'react';
import {
  Button,
  Screen,
  Input,
  TouchableTextBox,
} from '../../../common/SharedStyles';
import {Text} from '@ui-kitten/components';
import {logUserIn} from '../../../graphql/client';
import {GET_ME} from '../../../graphql/query/sharedQuery';
import {useInputState} from '../../../hooks/useInput';
import {
  getMeVariables,
  getMe as getMeType,
  verifyEmail as verifyEmailType,
  verifyEmailVariables,
  sendNewCode as sendNewCodeType,
  sendNewCodeVariables,
} from '../../../types/graphql';
import {CodeInputForm} from './styles';
import {StyleSheet} from 'react-native';
import {
  SEND_NEW_CODE,
  VERIFY_EMAIL,
} from '../../../graphql/mutation/sharedMutation';
import Toast from 'react-native-toast-message';
import Loading from '../../../components/Loading';
import {useNavigation} from '@react-navigation/core';
import {MainStackParamList} from '../../../navigators/Main/MainStackNavigator';

type AuthScreenProps = NativeStackNavigationProp<MainStackParamList, 'Auth'>;

interface IProps {
  route: {
    params: {
      token: string;
    };
  };
}

const ValidateScreen: React.FC<IProps> = ({route: {params}}) => {
  const {navigate} = useNavigation<AuthScreenProps>();
  const {token} = params;
  const {loading, data, refetch} = useQuery<getMeType, getMeVariables>(GET_ME, {
    variables: {token},
  });
  const [code, setCode] = useState<string>();
  const [email, setEmail] = useState<string>();
  const codeInput = useInputState();

  const [verifyEmailMutation, {loading: mutationLoading}] = useMutation<
    verifyEmailType,
    verifyEmailVariables
  >(VERIFY_EMAIL, {
    onCompleted: ({verifyEmail}) => {
      const {success, error, data: verifiedData} = verifyEmail;
      if (success && verifiedData) {
        if (refetch) {
          refetch();
        }
        AsyncStorage.removeItem('validation');
        logUserIn(token, verifiedData.id);
        navigate('AppMain', {id: data!.getMe.data!.id.toString(), token});
        return (
          <>
            {Toast.show({
              type: 'success',
              text1: '이메일이 인증 되었습니다',
              position: 'bottom',
            })}
          </>
        );
      } else {
        return (
          <>
            {Toast.show({
              type: 'error',
              text1: `${error as string}`,
              position: 'bottom',
            })}
          </>
        );
      }
    },
  });

  console.log(data?.getMe.data, token);

  const [sendNewCodeMutation] = useMutation<
    sendNewCodeType,
    sendNewCodeVariables
  >(SEND_NEW_CODE, {
    onCompleted: ({sendNewCode}) => {
      const {success, error, data: completeData} = sendNewCode;
      if (success && completeData) {
        if (completeData.verifiedCode) {
          setCode(completeData.verifiedCode);
        }
        return (
          <>
            {Toast.show({
              type: 'success',
              position: 'bottom',
              text1: '새로운 코드가 전송 되었습니다',
              text2: '이메일을 확인 해 주세요',
            })}
          </>
        );
      } else {
        console.log(error);
      }
    },
  });

  useEffect(() => {
    if (data && data.getMe.data?.verifiedCode) {
      setCode(data.getMe.data.verifiedCode);
    }
    if (data && data.getMe.data?.email) {
      setEmail(data.getMe.data.email);
    }
    if (data && data.getMe.data?.verified) {
      if (token) {
        logUserIn(token, data.getMe.data.id);
        navigate('AppMain', {id: data.getMe.data.id.toString(), token});
      }
    }
  }, [data, token, navigate]);

  const handleVerifying = useCallback(async () => {
    if (code !== codeInput.value) {
      return (
        <>
          {Toast.show({
            type: 'error',
            text1: '코드가 일치 하지 않습니다',
            position: 'bottom',
          })}
        </>
      );
    } else {
      await verifyEmailMutation({
        variables: {
          email: email as string,
          code: codeInput.value.toString(),
        },
      });
    }
  }, [codeInput.value, code, email, verifyEmailMutation]);

  if (loading || mutationLoading) {
    return <Loading />;
  }

  return (
    <Screen style={styles.container}>
      <CodeInputForm>
        <Input
          keyboardType="numeric"
          status="primary"
          {...codeInput}
          label="이메일 인증코드"
        />
        <Button
          onPress={() => handleVerifying()}
          appearance={mutationLoading ? 'outline' : 'filled'}>
          인증
        </Button>
        <TouchableTextBox
          position="flex-end"
          style={styles.touchablebox}
          onPress={() => {
            sendNewCodeMutation({variables: {email: email!}});
          }}>
          <Text status="primary">인증번호 재전송</Text>
        </TouchableTextBox>
      </CodeInputForm>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerbox: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchablebox: {
    marginTop: 40,
  },
});

export default ValidateScreen;
