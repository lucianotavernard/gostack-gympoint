import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  margin-bottom: 10px;
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #fff;
`;

export const Content = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: baseline;

  margin-bottom: 16px;
`;

export const StatusBar = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const Status = styled.Text`
  margin-left: 8px;
  color: ${props => (props.answered ? '#42CB59' : '#999999')};
  font-size: 14px;
  font-weight: bold;
`;

export const Time = styled.Text`
  color: #666;
  font-size: 13px;
`;

export const Text = styled.Text`
  line-height: 26px;
  color: #666;
  font-size: 14px;
`;
