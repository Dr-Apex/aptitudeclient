import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {signup} from '../auth/helper'
import Intro from './Intro';

const Signup = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    error: '',
    success: false
  });

  const {name, email, password, error, success} = values;

  const handleChange = name => event => {
    setValues({...values, error: false, [name]: event.target.value});
  };

  const onSubmit = event => {
    event.preventDefault();
    setValues({...values, error: false});
    signup({name, email, password})
    .then(data => {
      if (data.error) {
        setValues({...values, error: data.error, success: false});
      } else {
        setValues({
          ...values,
          name: '',
          email: '',
          password: '',
          error: '',
          success: true
        });
      }
    })
    .catch(console.log('Error in Signup'));
  };

  const signupForm = () => {
    return (
      <div className="login">
        <form>
        <h2>Welcome,</h2>
        <h5>Sign Up to Aptitude Cracker</h5>
          <div className="input">
            <div className="tag">Name</div>
            <input
              placeholder="Name"
              type='text'
              onChange={handleChange('name')}
              value={name}
            />
          </div>
          <div className="input">
            <div className="tag">Email</div>
            <input
              placeholder="Email"
              type='email'
              onChange={handleChange('email')}
              value={email}
            />
          </div>
          <div className="input">
            <div className="tag">Password</div>
            <input
              placeholder="Password"
              type='password'
              onChange={handleChange('password')}
              value={password}
            />
          </div>
          <br />
          <div className="access-btn">
            <button onClick={onSubmit}>
              Sign Up
            </button>
          </div>
          <div className="google">
            <button>
              Sign In with Google
            </button>
          </div>
          <div className="auth-link">
            <Link to="/">Already have an account? Sign In here.</Link>
          </div>
        </form>
      </div>
    );
  };

  const successMessage = () => {
    return (
      <div>
        <div>
          <div className="msg" style={{display: success ? '' : 'none'}}>
            New Account created successfully. Please{' '}
            <Link to='/'>Login Here.</Link>
          </div>
        </div>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div>
        <div>
          <div className="msg" style={{display: error ? '' : 'none'}}>
            {error}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container">
      <Intro />
      <div className="login-form">
        {successMessage()}
        {errorMessage()}
        <div className="math">
          {signupForm()}
        </div>
      </div>
    </div>
  );
};

export default Signup;
