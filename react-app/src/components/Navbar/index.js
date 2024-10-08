import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, UseSelector, useSelector } from "react-redux";
import Logo from '../../images/pure_favicon.png';
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
    })).then(navigate('/'));
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
          <button onClick={handleDemoLogin} className="link">Demo User</button>
        )}
        <NavLink to='/login' className='link'>Log In</NavLink>
        <NavLink to='/signup' className='link'>Sign Up</NavLink>
      </div>
    )
  }
  // console.log('isLoaded', isLoaded);
  // console.log('sessionLinks', sessionLinks);

  return (
    <div className="navbar wrapper">
      <ul>
        <li className="nav-list-item">
          <NavLink
            className={`${navData => navData.isActive ? 'active navbar' : 'navbar'} link`}
            id="logo-home"
            to="/">
            <div className="logo wrapper">
              <img
                className="navbar logo"
                alt="aembiousa-logo"
                src={Logo}
              />
            </div>
            <h2 className="navbar">AEMBioUSA</h2>
          </NavLink>
        </li>
        <li className="nav-list-item">
          <NavLink
            className={`${navData => navData.isActive ? 'active navbar' : 'navbar'} link`}
            to="/about-us">
            About Us
          </NavLink>
        </li>
        <li className="nav-list-item">
          <NavLink
            className={`${navData => navData.isActive ? 'active navbar' : 'navbar'} link`}
            to="/shop">
            Shop
          </NavLink>
        </li>
        <li className="nav-list-item">
          <NavLink
            className={`${navData => navData.isActive ? 'active navbar' : 'navbar'} link`}
            to="/contact-us">
            Contact Us
          </NavLink>
        </li>
        {sessionUser && (
          <li className="nav-list-item">
            <LogoutButton />
          </li>
        )}
        {!sessionUser && process.env.NODE_ENV === 'development' && (
          <li className="nav-list-item">
            <button onClick={handleDemoLogin} className="link">
              Demo User
            </button>
          </li>
        )}
        {!sessionUser && (
          <li className="nav-list-item">
            <NavLink to='/login' className='link'>
              Login
            </NavLink>
          </li>
        )}
        {!sessionUser && (
          <li className="nav-list-item">
            <NavLink to='/signup' className='link'>
              Sign Up
            </NavLink>
          </li>
        )}
      </ul>
    </div >
  );
}

export default Navbar;
