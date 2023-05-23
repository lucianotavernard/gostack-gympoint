import styled from 'styled-components/native';

import DefaultButton from '~/components/Button';

export const Container = styled.SafeAreaView`
  flex: 1;
  background: #f5f5f5;
`;

export const Loading = styled.ActivityIndicator.attrs({
  size: 'small',
  color: '#999',
})`
  margin: 30px 0;
`;

export const List = styled.FlatList.attrs({
  showVerticalsScrollIndicator: false,
  contentContainerStyle: {
    padding: 20,
  },
})``;

export const Button = styled(DefaultButton)`
  margin-bottom: 20px;
`;
