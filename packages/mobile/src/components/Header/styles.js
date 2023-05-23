import styled from 'styled-components/native';

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: ${({ hasGoBack }) => (hasGoBack ? 'flex-start' : 'center')};

  height: 46px;
  padding: 0 20px;
  border: 0 solid #ddd;
  border-bottom-width: 1px;
  background: #fff;
  z-index: 1;
`;

export const Logo = styled.Image``;
