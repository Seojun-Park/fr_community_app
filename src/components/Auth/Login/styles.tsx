import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Input = styled.TextInput`
  width: 60%;
  height: 40px;
  border-radius: 4px;
  background-color: gray;
  padding: 10px;
  font-size: 14px;
  margin: 8px 0;
`;

export const Touchable = styled.TouchableOpacity`
  width: 60%;
  padding: 8px;
  border: 1px solid black;
`;
