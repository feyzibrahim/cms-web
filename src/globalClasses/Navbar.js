import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../Hook/contextHooks/useAuthContext";

const Navbar = () => {
  const { user } = useAuthContext();

  return (
    <nav className="navbar">
      <h1>e_campus</h1>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        {!user && (
          <div>
            <Link to="/signup" className="fullColoredButton">
              Sign Up
            </Link>
            <Link to="/login" className="borderColoredButton">
              Log In
            </Link>
          </div>
        )}
        {user && (
          <div>
            <span>{user.email}</span>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
