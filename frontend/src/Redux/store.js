import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import authReducer from "./authDuck";
import alertReducer from "./alertDuck";
import apiReducer from "./apiDuck";
import appReducer from "./appDuck";
const rootReducer = combineReducers({
  auth: authReducer,
  alert: alertReducer,
  api: apiReducer,
  app: appReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore() {
  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
  );
  return store;
}
