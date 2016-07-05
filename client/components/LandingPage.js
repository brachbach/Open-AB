import React from 'react';
import LandingPageHeader from './LandingPageHeader';
import LandingPageCenter from './LandingPageCenter';
import Footer from './Footer.js';
import '../assets/styles/_landing.scss';

function LandingPage() {
  return (
    <div className="center">
      <LandingPageHeader />
      <LandingPageCenter />
      <Footer />
    </div>
  );
}

export default LandingPage;