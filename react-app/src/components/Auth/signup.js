import React, { useEffect, useState } from "react";
import * as sessionActions from "../../store/session";
import Logo from "../../images/favicon.png";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Check from "../../images/check.png";
import "./Auth.css";

function Signup() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validationErrors, setValidationErrors] = useState([]);
  const [hideErrors, setHideErrors] = useState([]);
  const [apiErrors, setApiErrors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const errors = [];

    if (firstName.length === 0) {
      errors.push('Please provide a first name.');
    } else if (firstName.length > 35) {
      errors.push('First name cannot be more than 35 characters long.');
    }

    if (lastName.length === 0) {
      errors.push('Please provide a last name.');
    } else if (lastName.length > 35) {
      errors.push('Last name cannot be more than 35 characters long.');
    }

    if (email.length === 0) {
      errors.push('Please provide an email.');
    } else if (email.length > 255) {
      errors.push('Email cannot be more than 255 characters long.');
    } else if (!email.includes('@')) {
      errors.push('Please provide a valid email.');
    }

    if (!password.length) {
      errors.push('Please provide a password.');
    } else if (password.length < 6) {
      errors.push('Password must be at least 6 characters.');
    } else if (confirmPassword !== password) {
      errors.push('Confirm password must match password.');
    }

    setValidationErrors(errors);
  }, [firstName, lastName, email, password, confirmPassword]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validationErrors.length) {
      const data = dispatch(sessionActions.signup({
        firstName,
        lastName,
        email,
        password
      })).catch(
        async (res) => {
          const data = await res.json();
          // console.log('Signup handleSubmit data', data);
          if (data && data.errors) {
            setApiErrors(data.errors);
            setHideErrors(false);
            return;
          }
        }
      );
      navigate('/');
    } else {
      setHideErrors(false);
    }
  };

  if (user) {
    navigate('/');
  }

  return (
    <div className="auth container">
      <div className='signup-container'>
        <div id='signup-form-wrapper'>
          <span>Sign Up</span>
          <form onSubmit={handleSubmit} id='signup-form'>
            <div hidden={hideErrors} className="errors">
              {validationErrors.map((error, ind) => (
                <div key={ind}>{error}</div>
              ))}
              {apiErrors.map((error, ind) => (
                <div key={ind}>{error}</div>
              ))}
            </div>
            <div className="input">
              <input
                type='text'
                name='firstName'
                onChange={e => setFirstName(e.target.value)}
                value={firstName}
                placeholder='first name'
              ></input>
            </div>
            <div className="input">
              <input
                type='text'
                name='lastName'
                onChange={e => setLastName(e.target.value)}
                value={lastName}
                placeholder='last name'
              ></input>
            </div>
            <div className="input">
              <input
                type='text'
                name='email'
                onChange={e => setEmail(e.target.value)}
                value={email}
                placeholder='name@email.com'
              ></input>
            </div>
            <div className="input">
              <input
                type='password'
                name='password'
                onChange={e => setPassword(e.target.value)}
                value={password}
                placeholder='password'
              ></input>
            </div>
            <div className="input">
              <input
                type='password'
                name='confirmPassword'
                onChange={e => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                placeholder='confirm password'
              ></input>
            </div>
            <button type='submit'>Sign Up</button>
          </form>
          <div className='login-reroute'>
            <div>Already have an account?</div>
            <NavLink to='/login' className='link'>
              Log In.
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
