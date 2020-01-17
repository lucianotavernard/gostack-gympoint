import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background: linear-gradient(0deg, #ee4d63, #ee4d63);
`;

export const Content = styled.div`
  width: 100%;
  max-width: 375px;
  padding: 30px;
  border-radius: 3px;
  text-align: center;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    picture {
      align-self: center;
      margin-bottom: 30px;

      img {
        width: 100%;
      }
    }

    h1 {
      margin-bottom: 30px;
      color: #ee4d64;
      font-size: 29px;
      font-weight: Bold;
      text-align: center;
      text-transform: uppercase;
    }

    label {
      margin-bottom: 5px;
      color: #444;
      font-size: 14px;
      font-weight: bold;
      text-align: left;
      text-transform: uppercase;
    }

    input {
      height: 44px;
      margin: 0 0 20px;
      padding: 0 15px;
      border: 1px solid #bbb;
      border-radius: 4px;
      color: #666;
      background: #fff;
      font-size: 16px;

      &::placeholder {
        color: #aaa;
      }
    }

    span {
      align-self: flex-start;
      margin: -15px 0 10px;
      color: #fb6f91;
      font-weight: bold;
    }

    button {
      height: 44px;
      margin: 5px 0 0;
      border: 0;
      border-radius: 4px;
      color: #fff;
      background: #ee4d63;
      font-size: 16px;
      font-weight: bold;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.03, '#ee4d63')};
        cursor: pointer;
      }
    }

    a {
      margin-top: 15px;
      color: #fff;
      font-size: 16px;
      opacity: 0.8;

      &:hover {
        opacity: 1;
      }
    }
  }
`;
