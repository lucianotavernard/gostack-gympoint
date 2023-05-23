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

export const Info = styled.View`
  flex-direction: row;
  justify-content: space-between;

  margin: 0 0 10px;
  padding: 15px 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: #fff;
`;

export const Label = styled.Text`
  color: #444;
  font-size: 14px;
  font-weight: bold;
`;

export const Time = styled.Text`
  color: #666;
  font-size: 12px;
`;
