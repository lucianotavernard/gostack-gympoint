import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 900px;
  margin: 50px auto;

  form {
    header {
      display: flex;
      align-self: center;
      align-items: center;
      justify-content: space-between;

      width: 100%;
      margin-bottom: 20px;

      h1 {
        color: #444;
        font-size: 24px;
      }

      div {
        display: flex;
      }

      a,
      button {
        display: flex;
        align-items: center;

        min-width: 100px;
        padding: 8px 20px;
        margin: 5px 0 0;
        border: 0;
        border-radius: 4px;
        color: #fff;
        font-size: 14px;
        font-weight: bold;
        text-transform: uppercase;
        transition: background 0.2s;

        &:hover {
          cursor: pointer;
        }
      }

      a {
        margin-right: 20px;
        background: #ccc;

        svg {
          margin-right: 10px;
        }

        &:hover {
          background: ${darken(0.09, '#ccc')};
        }
      }

      button {
        background: #ee4d63;

        &:hover {
          background: ${darken(0.09, '#ee4d63')};
        }
      }
    }

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
