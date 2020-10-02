import { SHOW_INFO } from "../actions/dataApi";

const initialState = {
  list: [],
};

export function showInfo(state = initialState, action) {
  switch (action.type) {
    case SHOW_INFO:
      return Object.assign({}, state, { list: action.payload });
    default:
      return state;
  }
}
