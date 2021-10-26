import styled from 'styled-components/native';
import {Layout} from '@ui-kitten/components';

export const SignUpForm = styled(Layout)`
  width: 80%;
  height: 50%;
  margin-bottom: 25px;
`;

export const TouchableText = styled.TouchableOpacity<PositionProps>`
  height: 30px;
  width: 100%;
  justify-content: center;
  align-items: ${props => props.position};
`;
