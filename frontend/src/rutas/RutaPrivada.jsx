import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
const RutaPrivada = ({ component: Component, ...props }) => {
  const user = useSelector((store) => store.auth.user);
  const authenticate = useSelector((store) => store.auth.authenticate);
  return (
    <Route
      {...props}
      render={(props) =>
        authenticate !== true && user === null ? (
          <Redirect to="/login" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default RutaPrivada;
