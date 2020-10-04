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

export const showInfo = (page = 1) => async (dispatch) => {
  const URL = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?page=${page}&sol=1000&api_key=${APIKEY}`;
  try {
    const res = await axios.get(URL);
    console.log(res.data);
    dispatch({ type: SHOW_INFO, payload: res.data });
  } catch (error) {
    console.log(error);
    dispatch({
      type: ERROR,
    });
  }
};

export const showCamera = () => async (dispatch) => {
  const URL =
    "https://api.nasa.gov/mars-photos/api/v1/manifests/Curiosity?api_key=" +
    APIKEY;
  try {
    const res = await axios.get(URL);
    dispatch({ type: SHOW_CAMERA, payload: res.data });
  } catch (e) {
    console.log(e);
    dispatch({
      type: ERROR,
    });
  }
};

export const showClimate = () => async (dispatch, getState) => {
  const URL =
    "https://api.nasa.gov/insight_weather/?api_key=" +
    APIKEY +
    "&feedtype=json&ver=1.0";
  try {
    const res = await axios.get(URL);
    console.log(res.data);
    dispatch({ type: SHOW_CLIMATE, payload: res.data });
  } catch (e) {
    console.log(e);
    dispatch({
      type: ERROR,
    });
  }
};
