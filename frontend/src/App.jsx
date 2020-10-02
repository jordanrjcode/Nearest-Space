import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import Home from "./components/Home";
import Background from "./components/Background";
import tokenAuth from "./config/token";
import Spinner from "./components/Spinner";
import RutaPrivada from "./rutas/RutaPrivada";
import { getUserAuthencticate } from "./Redux/authDuck";
import { useDispatch, useSelector } from "react-redux";
const token = localStorage.getItem("token");
if (token) {
  tokenAuth(token);
}

const App = () => {
  const dispatch = useDispatch();
  const loading = useSelector((store) => store.auth.loading);
  useEffect(() => {
    dispatch(getUserAuthencticate());
  }, []);
  return loading !== false ? (
    <Spinner />
  ) : (
    <Router>
      <Background />
      <Navbar />
      <Switch>
        <Route path="/login" component={Login} exact />
        <Route path="/signup" component={Signup} exact />
        <RutaPrivada path="/home" component={Home} exact />
        {/* <Route path="/" component={Landing} exact /> */}
      </Switch>
    </Router>
  );
};

export default App;
