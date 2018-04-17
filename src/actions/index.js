import axios from "axios";
import { browserHistory } from "react-router";
import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  FETCH_MESSAGES,
  FETCH_MOBILE_INFO,
  CLEAR_MOBILE_INFO
} from "./types";
import { API_URL, MOBILE_API_URL, MOBILE_MASHAPE_KEY } from "../constants";

export const getMobileInfo = (number, cb) => dispatch => {
  return axios
    .get(`${MOBILE_API_URL}/getInfo?mobno=${number}`, {
      headers: {
        "X-Mashape-Key": MOBILE_MASHAPE_KEY
      }
    })
    .then(resp => {
      dispatch({ type: FETCH_MOBILE_INFO, payload: resp.data });
    })
    .catch(err => {
      dispatch({ type: CLEAR_MOBILE_INFO });
      cb(500);
    });
};

export const signinUser = ({ email, password }) => dispatch => {
  axios
    .post(`${API_URL}/signin`, { email, password })
    .then(response => {
      // - update state indicate user is authenticated
      dispatch({ type: AUTH_USER });
      // - save the jwt token
      localStorage.setItem("token", response.data.token);
      // - redirect to the route '/search'
      browserHistory.push("/search");
    })
    .catch(() => {
      // - show an error to the user
      dispatch(authError("Bad login info"));
    });
};

export const signupUser = ({ username, email, password }) => dispatch => {
  axios
    .post(`${API_URL}/signup`, { username, email, password })
    .then(response => {
      dispatch({ type: AUTH_USER });
      // - save the jwt token
      localStorage.setItem("token", response.data.token);
      // - redirect to the route '/search'
      browserHistory.push("/search");
    })
    .catch(error => {
      dispatch(authError(error.response.data.error));
    });
};

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  };
}

export const signoutUser = () => dispatch => {
  localStorage.removeItem("token");
  dispatch({ type: UNAUTH_USER });
};

export const fetchMessage = () => dispatch => {
  axios
    .get(`${API_URL}`, {
      headers: { authorization: localStorage.getItem("token") }
    })
    .then(response => {
      dispatch({ type: FETCH_MESSAGES, payload: response.data.message });
    });
};
