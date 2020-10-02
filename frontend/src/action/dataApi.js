import axios from "axios";

export const SHOW_INFO = "SHOW_INFO";

export function showInfo() {
  return (dispatch, getState) => {
    const APIKEY = "TwP9PaqXaRU5Gago0QGNWI7efsT53kdSsY3LtWjy";
    const URL =
      "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=" +
      APIKEY;
    axios.get(URL).then((response) => {
      console.log(response);
      dispatch({ type: SHOW_INFO, payload: response.data });
    });
  };
}
