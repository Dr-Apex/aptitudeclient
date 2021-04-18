import React from 'react';
import logo from '../logo.png';

const Intro = () => {
  return (
    <div className="intro">
      <div className="logo">
        <h1>Aptitude Cracker</h1>
      </div>
      <div className="image">
        <img src={logo} alt="Math Teacher" />
      </div>
      <div className="about">
        About Us
      </div>
      <div className="footer">
        Copyright © 2019 AptitudeCracker
      </div>
    </div>
  );
};

export default Intro;

// <a href="https://www.vecteezy.com/free-vector/math-teacher">Math Teacher Vectors by Vecteezy</a>
