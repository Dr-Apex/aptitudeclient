import React from 'react';
import {Link} from 'react-router-dom';
import Navbar from './Navbar';

const Subscribe = () => {
  return (
    <div>
      <Navbar />
      <div className="subs">
        <h4>SUBSCRIPTION</h4>
      </div>
      <div className="subscribe">
        <div>
          <h3>Monthly</h3>
          <h1>Rs.3000</h1>
          <p>Enjoy full access for a month at no additional cost.</p>
          <button>
            <Link to="/payment">Buy Now</Link>
          </button>
        </div>
        <div>
          <h3>Yearly</h3>
          <h1>Rs.30000</h1>
          <p>Enjoy full access for a year at no additional cost.</p>
          <button>
            <Link to="/payment">Buy Now</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
