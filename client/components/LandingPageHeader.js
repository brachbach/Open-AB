import React from 'react';
import { Link } from 'react-router';
import '../assets/styles/_utils.scss';

function LandingPageHeader() {
  return (
    <nav>
      <div className="nav-wrapper mainColor">
        <img className="logo" alt="OpenAB" src="../assets/images/logo.png"></img>
        <a href="#" className="brand-logo">Open AB</a>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li>Sign in</li>
        </ul>
      </div>
    </nav>
  );
}

export default LandingPageHeader;


