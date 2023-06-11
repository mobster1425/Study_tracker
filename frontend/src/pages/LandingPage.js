import React from "react";
import study from "../assets/images/study.svg";
import { Link } from "react-router-dom";



const LandingPage = () => {
  return (
    <div className="container">
      <div className="homepage ">
        <div className="legend">
          <p className="legend-text">Welcome to Study Time Tracker</p>
          <p className="legend-text">
            the perfect tool for keeping track of your study time and <span className="underline"> increasing your productivity</span>
          </p>
          <p className="legend-subheader">
          With our easy-to-use study time tracker,
           you can easily log your study sessions and track your progress over time.
           Whether you're a student, a professional, or just someone 
          who wants to improve their productivity,
           our application can help you stay focused and achieve your goals.
          </p>

          <div className="get-started">
            <Link to="/signin" className="btn">
              Get Started
            </Link>
          </div>
        </div>

        <div className="landing-img">
          <img src={study} alt="study" />
        </div>
      </div>

      
      
    </div>
  );
};

export default LandingPage;
