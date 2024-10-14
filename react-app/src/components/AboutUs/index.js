import React from "react";
import './About.css';
import Banner from '../../images/about-banner.jpg';

function AboutUs() {


  return (
    <div className="about container">
      <div className="about-banner-wrapper">
        <img className="about-banner" src={Banner} loading="lazy" />
        <h2 className="about-heading">About Us</h2>
      </div>
    </div>
  );
}

export default AboutUs;
