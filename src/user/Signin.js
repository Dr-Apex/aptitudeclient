import React, {useState} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {signin, authenticate, isAuthenticated} from '../auth/helper';
import Intro from './Intro';

const Signin = () => {
  const [values, setValues] = useState({
    email: 'ethan@gmail.com',
    password: '12345678',
    error: '',
    loading: false,
    didRedirect: false
  });

  const {email, password, error, loading, didRedirect} = values;
  const {user} = isAuthenticated();

  const handleChange = name => event => {
    setValues({...values, error: false, [name]: event.target.value});
  };

  const onSubmit = event => {
    event.preventDefault();
    setValues({...values, error: false, loading: true});
    signin({email, password})
    .then(data => {
      if (data.err) {
        console.log(data.err);
        setValues({...values, error: data.err, loading: false});
      } else {
        authenticate(data, () => {
          setValues({...values, didRedirect: true});
        });
      }
    })
    .catch(console.log('Signin request failed'));
  };

  const performRedirect = () => {
    if (didRedirect) {
      if (user && user.role === 1) {
        return <Redirect to='/home' />;
      } else {
        return <Redirect to='/home' />;
      }
    }
    if (isAuthenticated()) {
      return <Redirect to='/' />;
    }
  };

  const loadingMessage = () => {
    return (
      loading && (
        <div className="msg">Loading...</div>
      )
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

  const signinForm = () => {
    return (
      <div className="login">
        <form>
          <h2>Welcome,</h2>
          <h5>Sign In to Aptitude Cracker</h5>
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
          <div className="forgot">
            <div>Forgot Password?</div>
          </div>
          <br />
          <div className="access-btn">
            <button onClick={onSubmit}>
              Sign In
            </button>
          </div>
          <div className="google">
            <button>
              Sign In with Google
            </button>
          </div>
          <div className="auth-link">
            <Link to="/signup">Don't have an account? Sign Up here.</Link>
          </div>
        </form>
      </div>
    );
  };

  return (
    <div className="container">
      <Intro />
      <div className="login-form">
        {loadingMessage()}
        {errorMessage()}
        <div className="math">
          {signinForm()}
          {performRedirect()}
        </div>
      </div>
    </div>
  );
};

export default Signin;
