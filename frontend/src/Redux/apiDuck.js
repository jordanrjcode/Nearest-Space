import axios from "axios";

//Data inicial
const initialState = {
  apiInfo: null,
  apiCamera: null,
  apiClimate: null,
};

const APIKEY = "TwP9PaqXaRU5Gago0QGNWI7efsT53kdSsY3LtWjy";
//Types
const SHOW_INFO = "SHOW_INFO";
const SHOW_CAMERA = "SHOW_CAMERA";
const SHOW_CLIMATE = "SHOW_CLIMATE";
const ERROR = "ERROR";

export default function apiReducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_INFO:
      return { ...state, apiInfo: action.payload };
    case SHOW_CAMERA:
      return { ...state, apiCamera: action.payload };
    case SHOW_CLIMATE:
      return { ...state, apiClimate: action.payload };
    case ERROR:
      return { ...state };
    default:
      return state;
  }
}

export const showClimate = () => async (dispatch, getState) => {
  const URL =
    "https://api.nasa.gov/insight_weather/?api_key=" +
    APIKEY +
    "&feedtype=json&ver=1.0";
  try {
    const res = await axios.get(URL);
    dispatch({ type: SHOW_CLIMATE, payload: res.data });
  } catch (e) {
    dispatch({
      type: ERROR,
    });
  }
};
