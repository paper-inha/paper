import React from 'react';
import ReactDOM from 'react-dom/client';
import Routing from './Routing';
import axios from 'axios';
const root = ReactDOM.createRoot(document.getElementById('root'));
axios.defaults.withCredentials = true;
root.render(
    <div>
    <Routing />
    </div>
);