import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import "./Navbar.css";
import { useSelector, useDispatch } from "react-redux";
import { logOutAction } from "../Redux/authDuck";
import Card from "./Card";

const Navbar = () => {
  const [showCards, setShowCards] = useState(false);
  const [classh, setClassH] = useState("header");
  const dispatch = useDispatch();
  const user = useSelector((store) => store.auth.user);
  const noHover = (e) => {
    if (e.target.classList.contains("no-hover")) {
      if (document.getElementById("header").classList.contains("si-hover")) {
        setClassH("header");
        setShowCards(false);
      }
    } else {
      if (!document.getElementById("header").classList.contains("si-hover")) {
        setClassH("header si-hover");
      }
    }
  };
  return (
    <header
      className={classh}
      id="header"
      onMouseEnter={(e) => {
        setShowCards(true);
        noHover(e);
      }}
      onMouseLeave={() => {
        setShowCards(false);
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
          SpaceMars.Jar
        </Link>
      </div>
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
                <span className="span no-hover">Messages</span>
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
          <Link className="logo no-hover" to="https://github.com/">
            <img
              src="/images/github.svg"
              className="no-hover"
              alt="GitHub Icon"
            />
          </Link>
        </div>
      </nav>
      {/* {showCards ? (
        <>
          <Card
            image_url={
              "https://mars.nasa.gov/system/resources/detail_files/3644_PIA14832-full2.jpg"
            }
            title="hola"
          />
          <Card
            image_url={
              "https://mars.nasa.gov/system/resources/detail_files/6617_Mars-MSL-Curiosity-Comet-Siding-Spring-meteor-showers-full2.jpg"
            }
            title="hola"
          />
          <Card
            image_url={
              "https://mars.nasa.gov/system/resources/detail_files/3652_PIA14841-full2.jpg"
            }
            title="hola"
          />
        </>
      ) : null} */}
    </header>
  );
};

export default Navbar;
