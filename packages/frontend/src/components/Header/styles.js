import styled, { css } from 'styled-components';

import { Link } from 'react-router-dom';

export const Container = styled.header`
  padding: 0 30px;
  background: #fff;
`;

export const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  max-width: 900px;
  height: 64px;
  margin: 0 auto;

  nav {
    display: flex;
    align-items: center;

    picture {
      display: flex;
      align-items: center;
    }

    > a {
      padding-right: 30px;
      margin-right: 30px;
      color: #ee4d64;
      font-size: 15px;
      font-weight: bold;
      text-decoration: none;
      text-transform: uppercase;
      border-right: 1px solid #eee;
    }

    ul {
      display: flex;

      li {
        padding: 0 10px;

        &:first-of-type {
          padding-left: 0;
        }

        &:hover a {
          color: #444;
        }
      }

      a {
        color: #999;
        font-size: 15px;
        font-weight: bold;
        text-decoration: none;
        text-transform: uppercase;
      }
    }
  }

  aside {
    display: flex;
    align-items: center;
  }
`;

export const LinkItem = styled(Link)`
  ${props =>
    props.active === 1 &&
    css`
      color: #444 !important;
    `}
`;

export const Profile = styled.div`
  display: flex;
  margin-left: 20px;

  div {
    margin-right: 10px;
    text-align: right;

    strong {
      display: block;
      color: #666;
      font-size: 14px;
      font-weight: bold;
    }

    a {
      display: block;
      margin-top: 2px;
      font-size: 12px;
      color: #999;
    }
  }

  img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
  }
`;

export const SignOut = styled.button.attrs({ type: 'button' })`
  border: none;
  color: #de3b3b;
  background: none;
  font-size: 14px;
  font-weight: 400;
  text-align: right;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;
