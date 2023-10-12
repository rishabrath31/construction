import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = (props) => {
  let isLoggedIn = props.isLoggedIn;
  let setisLoggedIn = props.setisLoggedIn;

  return (
    <div className="navbar">
      <Link to={"/"} className="logo">
        CONSTRUCTZ
      </Link>
      <div>
        {isLoggedIn && (
          <Link to="/home">
            <button>Home</button>
          </Link>
        )}
        {!isLoggedIn && (
          <Link to="/login">
            <button>Login</button>
          </Link>
        )}
        {!isLoggedIn && (
          <Link to="/register">
            <button>Register</button>
          </Link>
        )}
        {isLoggedIn && (
          <Link to="/project-form">
            <button>Project Form</button>
          </Link>
        )}
        {isLoggedIn && (
          <Link to="/projects">
            <button>Projects</button>
          </Link>
        )}
        {isLoggedIn && (
          <Link to="/task-form">
            <button>Task Form</button>
          </Link>
        )}
        {isLoggedIn && (
          <Link to="/tasks">
            <button>Tasks</button>
          </Link>
        )}
        {isLoggedIn && (
          <Link to="/login">
            <button onClick={() => setisLoggedIn((prev) => !prev)}>
              Logout
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
