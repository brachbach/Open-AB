import React from 'react';
import LandingPageHeader from './LandingPageHeader';
import LandingPageCenter from './LandingPageCenter';
import Footer from './Footer.js';
import '../assets/styles/_landingPage.scss';

function LandingPage() {
  return (
    <div className="center fullPage">
      <LandingPageHeader />
      <div className="mediumBlock" />
      <LandingPageCenter />
      <div className="mediumBlock" />
      <Footer />
    </div>
  );
}

export default LandingPage;
