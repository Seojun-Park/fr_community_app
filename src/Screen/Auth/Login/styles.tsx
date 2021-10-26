import styled from 'styled-components/native';
import {Layout} from '@ui-kitten/components';

interface PositionProps {
  position: string;
}

export const LoginForm = styled(Layout)`
  width: 80%;
  height: 20%;
`;

export const TouchableText = styled.TouchableOpacity<PositionProps>`
  height: 30px;
  width: 100%;
  justify-content: center;
  align-items: ${props => props.position};
`;
