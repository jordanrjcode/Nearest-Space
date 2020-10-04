import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import Messages from "./components/Messages";
import Background from "./components/Background";
import tokenAuth from "./config/token";
import Spinner from "./components/Spinner";
import RutaPrivada from "./rutas/RutaPrivada";
import { getUserAuthencticate } from "./Redux/authDuck";
import { useDispatch, useSelector } from "react-redux";
import { showInfo, showCamera, showClimate } from "./Redux/apiDuck";
import Gallery from "./components/Gallery";
import Planeta from "./components/Planeta";
const token = localStorage.getItem("token");
if (token) {
  tokenAuth(token);
}

const App = () => {
  const dispatch = useDispatch();
  const loading = useSelector((store) => store.auth.loading);
  useEffect(() => {
    dispatch(showInfo());
    dispatch(showClimate());
    // dispatch(showCamera());
    dispatch(getUserAuthencticate());
  }, [dispatch]);

  return loading !== false ? (
    <Spinner />
  ) : (
    <Router>
      <Background />
      <Navbar />
      <Switch>
        <Route path="/" exact>
          <Planeta />
          <Gallery />
        </Route>
        <Route path="/login" component={Login} exact />
        <Route path="/signup" component={Signup} exact />
        <RutaPrivada path="/messages" component={Messages} exact />
      </Switch>
    </Router>
  );
};

export default App;
