import React, { useState, useEffect } from "react";
import "./Login.css";
import { useSelector, useDispatch } from "react-redux";
import { iniciarSesionAction, getUserAuthencticate } from "../Redux/authDuck";
import { showAlertAction } from "../Redux/alertDuck";
import Alerta from "./Alerta";
const Login = (props) => {
  //dispatch
  const dispatch = useDispatch();
  const user = useSelector((store) => store.auth.user);
  const authenticate = useSelector((store) => store.auth.authenticate);
  const message = useSelector((store) => store.auth.message);
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  useEffect(() => {
    if (user && authenticate) props.history.push("/home");
    if (message) {
      dispatch(showAlertAction(message));
    }
  }, [authenticate, message, props.history]);
  const { username, password } = data;

  const saveData = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const sendAlert = (data) => {
    dispatch(showAlertAction(data));
  };

  const sendData = (e) => {
    e.preventDefault();
    if (!username.trim()) {
      sendAlert({ message: "Username is required", category: "Error" });
      return;
    }
    if (!password.trim()) {
      sendAlert({
        message: "Password is required ",
        category: "Error",
      });
      return;
    }
    dispatch(iniciarSesionAction(data));
  };

  return (
    <div className="container__login">
      <form
        onSubmit={(e) => {
          sendData(e);
        }}
        className="login"
      >
        <Alerta />
        <h2 className="login__title">SpaceMars.JAR</h2>
        <input
          type="text"
          className="login__input"
          placeholder="username"
          name="username"
          value={username}
          onChange={(e) => {
            saveData(e);
          }}
        />
        <input
          className="login__input"
          type="password"
          placeholder="password"
          name="password"
          value={password}
          onChange={(e) => {
            saveData(e);
          }}
        />
        <button type="submit" className="login__button">
          Login
        </button>
        <p className="login__options">Or Forgot Password</p>
        <p className="login__options">
          Dont have an account ? <span className="login__span">Signup</span>
        </p>
      </form>
    </div>
  );
};

export default Login;
