import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, UseSelector, useSelector } from "react-redux";
import Logo from '../../favicon.png';
import './Navbar.css';
import LogoutButton from "../Auth/logoutButton";
import * as sessionActions from "../../store/session";

function Navbar({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDemoLogin = async (e) => {
    e.preventDefault();
    return dispatch(sessionActions.login({
      email: 'demouser@demo.com',
      password: 'password',
    }));
  }

  let sessionLinks;

  if (sessionUser) {
    sessionLinks = (
      <div id="session-links">
        <LogoutButton />
      </div>
    );
  } else {
    sessionLinks = (
      <div id="session-links">
        {process.env.NODE_ENV === 'development' && (
          <button onClick={handleDemoLogin}>Demo User</button>
        )}
        <NavLink to='/login'>Log In</NavLink>
        <span>Signup</span>
      </div>
    )
  }
  console.log('isLoaded', isLoaded);
  console.log('sessionLinks', sessionLinks);

  return (
    <div className="navbar wrapper">
      <div className="left">
        <a href="/" id="logo-link" className="navbar">
          <div className="logo wrapper">
            <img
              className="navbar logo"
              alt="aembiousa-logo"
              src={Logo}
            />
          </div>
          <h2 className="navbar">AEMBioUSA</h2>
        </a>
      </div>
      <div className="right">
        <NavLink className="navbar" to="/">Home</NavLink>
        <NavLink className="navbar" to="/about-us">About Us</NavLink>
        <NavLink className="navbar" to="/shop">Shop</NavLink>
        <NavLink className="navbar" to="/contact-us">Contact Us</NavLink>
        {isLoaded && sessionLinks}
      </div>
    </div>
  );
}

export default Navbar;
