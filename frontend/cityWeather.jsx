import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import CSSSun from './util/css-sun.js';

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');
  ReactDOM.render(<Root />, root);

  CSSSun();
});
