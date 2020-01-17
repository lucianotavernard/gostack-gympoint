import { createGlobalStyle } from 'styled-components';

import 'react-toastify/dist/ReactToastify.css';
import 'react-datepicker/dist/react-datepicker.css';

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }

  html, body, #root {
    height: 100%;
  }

  body {
    background: #181818;
    font-family: 'Roboto', sans-serif;
    text-rendering: optimizeLegibility !important;
    --webkit-font-smoothing: antialiased !important;
  }

  input, textarea, button {
    font-family: 'Roboto', sans-serif;
  }

  ul {
    list-style: none;
  }

  a {
    text-decoration: none;
  }
`;
