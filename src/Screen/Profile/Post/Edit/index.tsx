import React from 'react';
import {Text} from '@ui-kitten/components';
import {Screen} from '../../../../common/SharedStyles';

interface IProps {
  route: {
    params: {
      userId: number;
      category: string;
      token: string;
    };
  };
}

const ProfileEditPost: React.FC<IProps> = ({route: {params}}) => {
  return (
    <Screen>
      <Text>profileedit</Text>
    </Screen>
  );
};

export default ProfileEditPost;
