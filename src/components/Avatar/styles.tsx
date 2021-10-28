import {TouchableOpacity} from 'react-native';
import styled from 'styled-components';

interface StyleProps {
  size: string;
}

export const AvatarContainer = styled(TouchableOpacity)<StyleProps>`
  width: ${props => props.size};
  height: ${props => props.size};
  border-radius: 100px;
  background-color: #dfe2ea;
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-right: 15px;
`;
