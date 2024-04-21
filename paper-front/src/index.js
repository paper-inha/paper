// index.js

import React from 'react';
import ReactDOM from 'react-dom';
import Routing from './Routing';
import axios from 'axios';

axios.defaults.withCredentials = true;


ReactDOM.render(
  <React.StrictMode>
    <Routing />
  </React.StrictMode>,
  document.getElementById('root')
);
