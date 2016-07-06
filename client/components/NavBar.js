import React, { Component } from 'react';
// import { Link } from 'react-router';
// import { connect } from 'react-redux';
// import { push } from 'react-router-redux';
import '../assets/styles/_nav.scss';

class NavBar extends Component {

  render() {
    return (
      <nav className="tenth mainColor" style={{visibility: 'hidden'}}>
        <div className="nav-wrapper">
          <img className="left logo" alt="OpenAB" src="../assets/images/logo.png"></img>
          <a href="#" className="center brand-logo">OpenA/B</a>
          <a href="#" className="right">Sign in</a>
        </div>
      </nav>
    );
  }
}

export default NavBar;
