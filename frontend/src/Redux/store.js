import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import authReducer, { getUserAuthencticate } from "./authDuck";
import alertReducer from "./alertDuck";
const rootReducer = combineReducers({
  auth: authReducer,
  alert: alertReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore() {
  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
  );
  return store;
}
