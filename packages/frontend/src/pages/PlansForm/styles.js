import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 900px;
  margin: 50px auto;

  form {
    section {
      display: flex;
      flex-direction: column;

      padding: 30px;
      margin-top: 30px;

      border-radius: 3px;
      background-color: #fff;
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
      width: 100%;
      height: 44px;
      margin: 0 0 20px;
      padding: 0 15px;
      border: 1px solid #bbb;
      border-radius: 4px;
      color: #666;
      background: #fff;
      font-size: 16px;

      &:disabled {
        background-color: #f5f5f5;
      }

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

    hr {
      height: 1px;
      margin: 10px 0 20px;
      border: 0;
      background: rgba(255, 255, 255, 0.2);
    }

    > button {
      height: 36px;
      margin: 5px 0 0;
      padding: 8px 15px;
      border: 1px solid ${darken(0.01, '#3b9eff')};
      border-radius: 4px;
      color: #fff;
      background: #3b9eff;
      font-weight: bold;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.03, '#3b9eff')};
      }

      svg {
        margin-right: 10px;
      }
    }
  }

  > button {
    width: 100%;
    height: 36px;
    margin: 5px 0 0;
    padding: 8px 15px;
    border: 1px solid ${darken(0.01, '#f64c75')};
    border-radius: 4px;
    color: #fff;
    background: #f64c75;
    font-weight: bold;
    transition: background 0.2s;

    &:hover {
      background: ${darken(0.03, '#f64c75')};
    }

    svg {
      margin-right: 10px;
    }
  }
`;

export const FormControl = styled.div`
  display: flex;
  justify-content: space-between;

  > div {
    flex: 1;
    display: flex;
    flex-direction: column;

    &:not(:last-of-type) {
      margin-right: 20px;
    }
  }
`;
