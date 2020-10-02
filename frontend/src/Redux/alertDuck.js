const stateInicial = {
  alert: null,
};

const SHOW_ALERT = "SHOW_ALERT";
const HIDE_ALERT = "HIDE_ALERT";

export default function alertReducer(state = stateInicial, action) {
  switch (action.type) {
    case SHOW_ALERT:
      return { ...state, alert: action.payload };
    case HIDE_ALERT:
      return { ...state, alert: null };
    default:
      return state;
  }
}

export const showAlertAction = (data) => (dispatch) => {
  dispatch({
    type: SHOW_ALERT,
    payload: data,
  });
  setTimeout(() => {
    dispatch({ type: HIDE_ALERT });
  }, 125);
};
