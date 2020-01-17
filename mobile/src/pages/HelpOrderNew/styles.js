import styled from 'styled-components/native';

import Button from '~/components/Button';

export const Container = styled.SafeAreaView`
  flex: 1;
  padding: 20px;
`;

export const Input = styled.TextInput.attrs({
  placeholderTextColor: '#999',
})`
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  color: #333;
  background-color: #fff;
  font-size: 15px;
`;

export const FormSubmit = styled(Button)`
  margin-top: 20px;
`;
