import React from 'react';
import {Link} from 'react-router-dom';
import '../styles.css';
import Card from './Card';
import Twitter from '../Twitter.png';
import Instagram from '../Instagram.png';
import Linkedin from '../Linkedin.png';

const Dashboard = () => {
  return (
    <div className="home-box">
      <div className="home">
        <div className="top">
          <div className="top-box">
            <h2>Welcome to AptitudeCracker</h2>
            <h3>We provide best practise environment for competitive exams.</h3>
          </div>
        </div>
        <div className="abt">
          <h4>ABOUT US</h4>
          <p>
            Creating practise papers from research done by professional teachers.
            The goal is to provide best practise environment for competitive
            exams and to help increase their speed.
          </p>
        </div>
        <div className="deck">
          <div className="row">
            <div className="abt-us">
              <h5>Quickest Solution</h5>
              <p>We provide the quickest solution to the problem.</p>
            </div>
            <div className="abt-us">
              <h5>Hand-picked Questions</h5>
              <p>We provide questions that are most likely to come.</p>
            </div>
          </div>
          <div className="row">
            <div className="abt-us">
              <h5>Timer</h5>
              <p>See how much time you take to solve a question.</p>
            </div>
            <div className="abt-us">
              <h5>Solutions by Experts</h5>
              <p>All questions are solved by experts.</p>
            </div>
          </div>
        </div>
        <div className="subscribe">
          <p>Subscribe to unlock access to all the competitive questions...</p>
          <button>
            <Link to="/subscribe">Subscribe</Link>
          </button>
        </div>
        <div className="abt">
          <h4>MOST PRACTICED SESSIONS</h4>
        </div>
        <div className="deck">
          <div className="row">
            <Card />
            <Card />
          </div>
          <div className="row">
            <Card />
            <Card />
          </div>
          <div className="row">
            <Card />
            <Card />
          </div>
        </div>
        <div className="foot">
          <div className="link">
            <div><img src={Twitter} alt="Twitter" /></div>
            <div><img src={Instagram} alt="Instagram" /></div>
            <div><img src={Linkedin} alt="Linkedin" /></div>
          </div>
          <div className="link">Copyright © 2019 AptitudeCracker</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
