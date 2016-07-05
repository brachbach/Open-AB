import React from 'react';
import '../assets/styles/_utils.scss';
import '../assets/styles/_landingPageCenter.scss';
import { Link } from 'react-router';

function LandingPageCenter() {
  return (
    <div className="mainColor mediumBlock">
      <Link to="/Dashboard">Go to Dashboard</Link>
    </div>
  );
}

export default LandingPageCenter;
