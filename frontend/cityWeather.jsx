import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');
  ReactDOM.render(<Root />, root);

  let delta = .6;
  let degrees = 0;
  
  setInterval(() => changeBackground(), 50);

  const changeBackground = () => {
    if(delta + degrees >= 60) {
      delta = -.6;
    } else if (delta + degrees <= -60) {
      delta = .6;
    }
    degrees += delta;
    document.documentElement.style.setProperty("--gradDeg", `${degrees}deg`);
  }
});
