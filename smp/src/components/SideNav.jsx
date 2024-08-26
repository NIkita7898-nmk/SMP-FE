// src/components/SideNavbar.js
import React from "react";
import "./SideNav.css";
import { Link } from "react-router-dom";

const SideNavbar = () => {
  return (
    <>
        <div className="side-navbar">
          <Link to="/home">
            <h3>Home</h3>
          </Link>
          <Link to="/login">
            <h3>Login</h3>
          </Link>
        </div>
    </>
  );
};

export default SideNavbar;
