import clienteAxios from "../config/axios";
//State
const initialState = {
  searchUsers: null,
};

//Types
const SEARCH_USERS = "SEARCH_USERS";
const SEARCH_USERS_ERROR = "SEARCH_USERS_ERROR";

//Reducer
export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case SEARCH_USERS:
      return { ...state, searchUsers: action.payload.listUsers };
    case SEARCH_USERS_ERROR:
      return { ...state };
    default:
      return state;
  }
}

//Actions
export const searchListUser = (data) => async (dispatch) => {
  try {
    const response = await clienteAxios.post("/api/app/users", data);
    dispatch({
      type: SEARCH_USERS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: SEARCH_USERS_ERROR,
    });
  }
};
