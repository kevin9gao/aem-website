import React from "react";
import { NavLink } from "react-router-dom";
import { UseSelector, useSelector } from "react-redux";
import Logo from '../../favicon.png';
import './Navbar.css';

function Navbar({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);
    
    let sessionLinks;
    
    if (sessionUser) {
        sessionLinks = (
            <div id="session-links">
                <span>Profile Button Placeholder</span>
            </div>
        );
    } else {
        sessionLinks = (
            <div id="session-links">
                <span>Demo User</span>
                <span>Login</span>
                <span>Signup</span>
            </div>
        )
    }
    
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