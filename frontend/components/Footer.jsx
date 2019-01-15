import React from 'react';

export default function Footer() {
  const { github, linkedIn, acLogo } = window;

  return (
    <div id="footer">
      <a href="https://github.com/AndreC93" target="_blank">
        <img src={github} alt="Github" />
      </a>
      <a href="https://www.linkedin.com/in/andre-chow/" target="_blank">
        <img src={linkedIn} alt="LinkedIn" />
      </a>
      <a href="https://www.andrechow.com/" target="_blank">
        <img src={acLogo} alt="Visit my Site" />
      </a>
    </div>
  )
}

