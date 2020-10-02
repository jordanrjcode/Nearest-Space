import React from "react";
import { NavLink, Link } from "react-router-dom";
import "./Navbar.css";
import { useSelector, useDispatch } from "react-redux";
import { logOutAction } from "../Redux/authDuck";
const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.auth.user);
  return (
    <header>
      <div className="brand__container">
        <Link to="/" className="brand__title">
          SpaceMars.Jar
        </Link>
      </div>
      <nav className="navbar__container">
        <div className="navbar__list">
          <NavLink className="list__item" to="/">
            <span className="span">Home</span>
          </NavLink>
          <NavLink
            activeClassName="list__item__active"
            className="list__item"
            to="/about"
          >
            <span className="span">About</span>
          </NavLink>
          {user ? (
            <p
              onClick={() => {
                dispatch(logOutAction());
              }}
              className="list__item"
            >
              <span className="span">Log out</span>
            </p>
          ) : (
            <>
              <NavLink
                activeClassName="list__item__active"
                className="list__item"
                to="/login"
              >
                <span className="span">Login</span>
              </NavLink>
              <NavLink
                activeClassName="list__item__active"
                className="list__item"
                to="/signup"
              >
                <span className="span">Signup</span>
              </NavLink>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
