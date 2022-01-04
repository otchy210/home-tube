import React from 'react';
import ReactDOM from 'react-dom';
import HomePage from './components/pages/HomePage';

const root = document.getElementById('root');
if (root) {
    ReactDOM.render(<HomePage />, root);
}
