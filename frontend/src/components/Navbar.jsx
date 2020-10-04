import React, { useState, useEffect } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import "./Navbar.css";
import { useSelector, useDispatch } from "react-redux";
import { logOutAction } from "../Redux/authDuck";

const Navbar = () => {
  const [currentlocation, setCurrentLocation] = useState();
  const [showCards, setShowCards] = useState(false);
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
          setShowCards(false);
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
          setShowCards(true);
          noHover(e);
        }
      }}
      onMouseLeave={() => {
        if (currentlocation === "/") {
          setShowCards(false);
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
          <img src="/images/logoPLanetas.svg" alt="logoPlanetas" />
          <img src="/images/logoNombre.svg" alt="logoNombre" />
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
