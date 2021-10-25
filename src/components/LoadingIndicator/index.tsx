import {Spinner} from '@ui-kitten/components';
import React from 'react';
import {LoadingIndicatorBox} from '../../common/SharedStyles';

interface IProps {
  size: string;
}

const LoadingIndicator: React.FC<IProps> = ({size}) => (
  <LoadingIndicatorBox>
    <Spinner size={size} />
  </LoadingIndicatorBox>
);

export default LoadingIndicator;
