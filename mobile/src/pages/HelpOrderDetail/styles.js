import styled from 'styled-components/native';

export const Container = styled.ScrollView`
  flex: 1;
  padding: 20px;
`;

export const Content = styled.View`
  margin-bottom: 30px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #fff;
`;

export const Box = styled.View`
  margin-top: 20px;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  margin-bottom: 16px;
`;

export const Title = styled.Text`
  color: #333;
  font-size: 16px;
  font-weight: bold;
`;

export const Time = styled.Text`
  color: #666;
  font-size: 14px;
`;

export const Description = styled.Text`
  line-height: 26px;
  color: #666;
  font-size: 14px;
`;
