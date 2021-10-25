import {Icon} from '@ui-kitten/components';
import React from 'react';
import {Caption, CaptionText} from '../common/SharedStyles';

interface CaptionProps {
  caption: string;
  size?: string | null | undefined;
  color?: string | null | undefined;
}

export const renderCaption: React.FC<CaptionProps> = ({
  caption,
  size,
  color,
}) => {
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
