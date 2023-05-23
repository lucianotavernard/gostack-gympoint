import styled from 'styled-components';

export const Wrapper = styled.div`
  min-height: 100%;
  background: #eceef3;

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
`;
