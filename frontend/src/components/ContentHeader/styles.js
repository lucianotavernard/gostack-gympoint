import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.header`
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

    &:only-child {
      margin-right: 0;
    }

    &:only-of-type {
      background: #ee4d63;

      svg {
        margin-right: 0;
      }

      &:hover {
        background: ${darken(0.09, '#ee4d63')};
      }
    }
  }

  button {
    background: #ee4d63;

    &:hover {
      background: ${darken(0.09, '#ee4d63')};
    }
  }
`;
