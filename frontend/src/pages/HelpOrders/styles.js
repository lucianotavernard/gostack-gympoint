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

    button {
      border: 0;
      color: #4d85ee;
      background: none;
      font-size: 15px;
      cursor: pointer;

      &:hover {
        color: ${darken(0.09, '#4d85ee')};
      }
    }

    table {
      width: 100%;
      color: #666;
      border-collapse: collapse;

      thead {
        tr {
          margin-bottom: 20px;
        }

        th {
          padding-bottom: 10px;
          text-align: left;
          text-transform: uppercase;
        }
      }

      tbody tr {
        td {
          padding: 12px 0;
          border-top: 1px solid #dee2e6;

          &:last-of-type {
            text-align: right;
          }
        }

        &:first-of-type {
          td {
            border: 0;
          }
        }
      }
    }
  }
`;
