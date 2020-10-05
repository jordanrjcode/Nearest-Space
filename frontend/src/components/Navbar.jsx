import React, { useState, useEffect } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import "./Navbar.css";
import { useSelector, useDispatch } from "react-redux";
import { logOutAction } from "../Redux/authDuck";

const Navbar = () => {
  const [currentlocation, setCurrentLocation] = useState();
  const [classh, setClassH] = useState("header");
  let location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.auth.user);
  useEffect(() => {
    setCurrentLocation(location.pathname);
  }, [location]);
  if (currentlocation === "/messages") return null;
  const noHover = (e) => {
    if (currentlocation === "/") {
      if (e.target.classList.contains("no-hover")) {
        if (document.getElementById("header").classList.contains("si-hover")) {
          setClassH("header");
        }
      } else {
        if (!document.getElementById("header").classList.contains("si-hover")) {
          setClassH("header si-hover");
        }
      }
    }
  };
  return (
    <header
      className={classh}
      id="header"
      onMouseEnter={(e) => {
        if (currentlocation === "/") {
          noHover(e);
        }
      }}
    >
      <div
        className="brand__container no-hover"
        id="navbar__container"
        onMouseEnter={(e) => {
          noHover(e);
        }}
      >
        <Link to="/" className="brand__title no-hover">
          <img src="/images/logoNombre.svg" alt="logoNombre" />
        </Link>
      </div>
      <nav className="navbar__cell">
        <div></div>
        <div></div>
        <div></div>
      </nav>
      <nav
        className="navbar__container no-hover"
        onMouseEnter={(e) => {
          noHover(e);
        }}
      >
        <div className="navbar__list no-hover" id="navbar__list">
          {user ? (
            <>
              <NavLink className="list__item no-hover" to="/messages">
                <span className="span no-hover">App</span>
              </NavLink>
              <p
                onClick={() => {
                  dispatch(logOutAction());
                }}
                className="list__item no-hover"
              >
                <span className="span no-hover">Log out</span>
              </p>
            </>
          ) : (
            <>
              <NavLink
                activeClassName="list__item__active "
                className="list__item no-hover"
                to="/about"
              >
                <span className="span no-hover">About</span>
              </NavLink>
              <NavLink
                activeClassName="list__item__active"
                className="list__item no-hover"
                to="/login"
              >
                <span className="span no-hover">Login</span>
              </NavLink>
              <NavLink
                activeClassName="list__item__active"
                className="list__item no-hover"
                to="/signup"
              >
                <span className="span no-hover">Signup</span>
              </NavLink>
            </>
          )}
          <a
            className="logo no-hover"
            href="https://github.com/jordanrjcode/Nearest-Space"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/images/github.svg"
              className="no-hover"
              alt="GitHub Icon"
            />
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
