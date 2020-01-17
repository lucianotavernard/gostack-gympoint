import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  max-width: 900px;
  margin: 50px auto 0;

  section {
    padding: 30px;
    border-radius: 3px;
    background-color: #fff;

    a {
      margin-right: 20px;
      color: #4d85ee;
      font-size: 15px;
      text-align: right;

      &:hover {
        color: ${darken(0.09, '#4d85ee')};
      }
    }

    button {
      border: 0;
      color: #de3b3b;
      background: none;
      font-size: 15px;
      cursor: pointer;

      &:hover {
        color: ${darken(0.09, '#de3b3b')};
      }
    }
  }
`;

export const InputControl = styled.div`
  display: flex;
  align-items: center;
  padding: 0 15px;
  margin: 5px 0 0;
  border: 1px solid #bbb;
  border-radius: 4px;
  color: #666;
  background: #fff;

  input {
    height: 36px;
    margin-left: 8px;
    border: 0;
    font-size: 16px;
    color: #666;

    &::placeholder {
      color: #aaa;
    }
  }
`;
