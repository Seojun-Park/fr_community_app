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
import {AuthStackParamList} from '../../../navigators/Auth/AuthStackNavigator';
import {
  getMeVariables,
  getMe as getMeType,
  verifyEmail as verifyEmailType,
  verifyEmailVariables,
} from '../../../types/graphql';
import LoadingIndicator from '../../../components/Loading';
import {CodeInputForm} from './styles';
import {StyleSheet} from 'react-native';
import {VERIFY_EMAIL} from '../../../graphql/mutation/sharedMutation';
import Toast from 'react-native-toast-message';
import Loading from '../../../components/Loading';

type ValidateScreenProps = NativeStackNavigationProp<
  AuthStackParamList,
  'Validate'
>;

interface IProps {
  route: {
    params: {
      token: string;
    };
  };
}

const ValidateScreen: React.FC<IProps> = ({route: {params}}) => {
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
      }
    }
  }, [data, token]);

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

  if (loading) {
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
          accessoryLeft={
            mutationLoading ? <LoadingIndicator size="small" /> : undefined
          }
          appearance={mutationLoading ? 'outline' : 'filled'}>
          인증
        </Button>
        <TouchableTextBox position="flex-end" style={styles.touchablebox}>
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
