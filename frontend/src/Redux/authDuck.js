import clienteAxios from "../config/axios";
import tokenAuth from "../config/token";
//State inicial
const stateInicial = {
  user: null,
  message: null,
  authenticate: false,
  loading: false,
};

//Types
const INICIO_SESION_EXITO = "INICIO_SESION_EXITO";
const INICIO_SESION_ERROR = "INICIO_SESION_ERROR";
const REGISTRAR_USUARIO_EXITO = "REGISTRAR_USUARIO_EXITO";
const REGISTRAR_USUARIO_ERROR = "REGISTRAR_USUARIO_ERROR";
const GET_USER_AUTHENTICATE = "GET_USER_AUTHENTICATE";
const GET_USER_AUTHENTICATE_ERROR = "GET_USER_AUTHENTICATE_ERROR";
const CLEAR_MESSAGE = "CLEAR_MESSAGE";
const LOADING = "LOADING";
const LOGOUT = "LOGOUT";

//Reducer
export default function reducer(state = stateInicial, action) {
  switch (action.type) {
    case REGISTRAR_USUARIO_EXITO:
    case INICIO_SESION_EXITO:
      localStorage.setItem("token", action.payload.token);
      return { ...state, message: null, authenticate: true, loading: false };
    case INICIO_SESION_ERROR:
    case REGISTRAR_USUARIO_ERROR:
    case GET_USER_AUTHENTICATE_ERROR:
      localStorage.removeItem("token");
      return {
        ...state,
        user: null,
        message: action.payload,
        authenticate: false,
        loading: false,
      };
    case LOADING:
      return { ...state, loading: true };
    case GET_USER_AUTHENTICATE:
      return {
        ...state,
        user: action.payload.user,
        authenticate: true,
        loading: false,
      };
    case LOGOUT:
      localStorage.removeItem("token");
      return { ...state, loading: false, user: null, authenticate: false };
    case CLEAR_MESSAGE:
      return { ...state, message: null, loading: false };
    default:
      return state;
  }
}

//Actions

export const getUserAuthencticate = () => async (dispatch) => {
  dispatch({
    type: LOADING,
  });
  const token = localStorage.getItem("token");
  console.log(token);
  if (token) {
    tokenAuth(token);
  }
  try {
    const respuesta = await clienteAxios.get("/api/auth/user");
    console.log(respuesta.data);
    dispatch({
      type: GET_USER_AUTHENTICATE,
      payload: respuesta.data,
    });
  } catch (error) {
    console.log(error.response);
    dispatch({
      type: GET_USER_AUTHENTICATE_ERROR,
    });
  }
};

export const iniciarSesionAction = (data) => async (dispatch, getState) => {
  try {
    const respuesta = await clienteAxios.post("/api/auth/login", data);
    console.log(respuesta.data);
    dispatch({
      type: INICIO_SESION_EXITO,
      payload: respuesta.data,
    });
    getUserAuthencticate()(dispatch);
  } catch (error) {
    console.log(error.response);
    let alerta = {
      message: error.response.data.msg,
      category: "Error",
    };
    console.log(alerta);
    dispatch({
      type: INICIO_SESION_ERROR,
      payload: alerta,
    });
    setTimeout(() => {
      dispatch({
        type: CLEAR_MESSAGE,
      });
    }, 500);
  }
};

export const signupAction = (data) => async (dispatch) => {
  try {
    const respuesta = await clienteAxios.post("/api/auth/register", data);
    console.log(respuesta.data);
    dispatch({
      type: REGISTRAR_USUARIO_EXITO,
      payload: respuesta.data,
    });
    getUserAuthencticate()(dispatch);
  } catch (error) {
    console.log(error.response);
    let alerta = {
      message: error.response.data.msg,
      category: "Error",
    };
    dispatch({
      type: INICIO_SESION_ERROR,
      payload: alerta,
    });
    setTimeout(() => {
      dispatch({
        type: CLEAR_MESSAGE,
      });
    }, 500);
  }
};

export const logOutAction = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};
