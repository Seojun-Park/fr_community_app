import styled from 'styled-components';
import {Icon} from '@ui-kitten/components';

interface StyleProps {
  size: number;
}

export const CustomAvatar = styled(Icon)<StyleProps>`
  width: ${props => props.size};
  height: ${props => props.size};
`;
