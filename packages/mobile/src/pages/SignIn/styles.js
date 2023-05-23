import styled from 'styled-components/native';

import Button from '~/components/Button';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 30px;
`;

export const Logo = styled.Image``;

export const Form = styled.View`
  align-self: stretch;
  margin-top: 50px;
`;

export const SubmitForm = styled(Button)`
  margin-top: 4px;
`;

export const Input = styled.TextInput.attrs({
  placeholderTextColor: '#999',
})`
  height: 46px;
  margin-bottom: 10px;
  padding-left: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  color: #333;
  background: #fff;
  font-size: 15px;
`;
