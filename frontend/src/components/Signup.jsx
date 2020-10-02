import React, { useState, useEffect } from "react";
import "./Signup.css";
import { useSelector, useDispatch } from "react-redux";
import { showAlertAction } from "../Redux/alertDuck";
import { signupAction } from "../Redux/authDuck";
import Alert from "./Alerta";
const Signup = (props) => {
  const dispatch = useDispatch();
  const message = useSelector((store) => store.auth.message);
  const authenticate = useSelector((store) => store.auth.authenticate);
  const user = useSelector((store) => store.auth.user);
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });
  useEffect(() => {
    if (user && authenticate) props.history.push("/home");
    if (message) {
      dispatch(showAlertAction(message));
    }
  }, [user, authenticate, message, props.history]);
  const { username, email, password } = data;

  const sendAlert = (data) => {
    dispatch(showAlertAction(data));
  };

  const sendData = (e) => {
    e.preventDefault();
    if (!username.trim()) {
      sendAlert({ message: "Username is required", category: "Error" });
      return;
    }
    if (!email.trim()) {
      sendAlert({ message: "Email is required", category: "Error" });
      return;
    }
    if (!password.trim()) {
      sendAlert({
        message: "The password must have a minimum of 6 characters",
        category: "Error",
      });
      return;
    }
    dispatch(signupAction(data));
  };
  return (
    <div className="container__signup">
      <form
        className="signup"
        onSubmit={(e) => {
          sendData(e);
        }}
      >
        <Alert />
        <h2 className="signup__title">SpaceMars.JAR</h2>
        <input
          name="username"
          type="text"
          value={username}
          className="signup__input"
          placeholder="Username"
          onChange={(e) => {
            setData({ ...data, [e.target.name]: e.target.value });
          }}
        />
        <input
          name="email"
          value={email}
          type="email"
          onChange={(e) => {
            setData({ ...data, [e.target.name]: e.target.value });
          }}
          className="signup__input"
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          className="signup__input"
          placeholder="Password "
          value={password}
          onChange={(e) => {
            setData({ ...data, [e.target.name]: e.target.value });
          }}
        />
        <button type="submit" className="signup__button">
          Signup
        </button>
        <p className="signup__options">
          Already have an account? <span className="signup__span">Login</span>
        </p>
      </form>
    </div>
  );
};

export default Signup;
