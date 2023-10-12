import React from "react";
import "./LandingPage.css";

const LandingPage = () => {
  return (
    <div className="landing-page">
      <header>
        <h1>
          Welcome to <span>C</span>onstructz
        </h1>
        <p>We provide the best services accross multiple cities</p>
        <a href="/projects" className="cta-button">
          Explore Projects
        </a>
      </header>
    </div>
  );
};

export default LandingPage;
