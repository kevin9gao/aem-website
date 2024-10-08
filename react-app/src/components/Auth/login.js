import React, { useState } from "react";
import * as sessionActions from '../../store/session';
import Logo from '../../images/favicon.png';
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import './Auth.css';

function Login() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ email, password })).catch(
      async (res) => {
        // console.log('res', res);
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
        // console.log('data.errors', data.errors);
      }
    );
  }

  if (user) {
    navigate('/');
  }

  return (
    <div className="auth container">
      <div id='login-container'>
        <div id='login-form-wrapper'>
          <div id='login-header'>
            <div id="logo-wrapper">
              <NavLink to='/'>
                <img
                  id="logo"
                  src={Logo}
                  alt='logo'
                />
              </NavLink>
              <NavLink to='/'>
                <span>AEMBioUSA</span>
              </NavLink>
            </div>
          </div>
          <span>Log in to AEM</span>
          <form onSubmit={handleSubmit} id='login-form'>
            <div className="errors">
              {errors.map((error, ind) => (
                <div key={ind}>{error}</div>
              ))}
            </div>
            <div className="input">
              <input
                name='email'
                type='text'
                placeholder='name@email.com'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input">
              <input
                name='password'
                type='password'
                placeholder='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type='submit'>Login</button>
          </form>
          <div className='login-reroute' id='signup-reroute'>
            <div>Don't have an account?</div>
            <NavLink to='/signup' className='link'>
              Sign Up.
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
