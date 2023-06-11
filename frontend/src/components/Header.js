import React from "react";
import logo from "../assets/images/logo.jpeg";
//import { useState } from "react";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { logout, reset } from "../features/auth/authSlice";

const Header = () => {
  const navigate = useNavigate();
 const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

// [user,setuser]=useState(true);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
   //setuser(false);
    navigate("/signin");
  };

  return (
    <header>
      <Link to="/" className="logo">
        <h1>StudyTracker</h1>
        <img src={logo} alt="logo" />
      </Link>

      <nav className="menu">
        <ul className="menu-list">
          
          {!user ? (
            <li className="menu-list_item">
              <Link to="/signin">Sign In</Link>
            </li>
          ) : (
            <button className="btn btn-no-bg" onClick={onLogout}>
              Sign Out
            </button>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;