import {Icon} from '@ui-kitten/components';
import React from 'react';
import {Caption, CaptionText} from '../common/SharedStyles';

interface CaptionProps {
  caption: string;
  size?: string | undefined;
  color?: string | undefined;
}

export const renderCaption: React.FC<CaptionProps> = ({
  caption,
  size,
  color,
}): React.ReactElement<any, any> => {
  return (
    <Caption>
      <Icon
        {...{width: 10, height: 10, marginRight: 5}}
        name="alert-circle-outline"
      />
      <CaptionText captionColor={color} captionSize={size}>
        {caption}
      </CaptionText>
    </Caption>
  );
};
