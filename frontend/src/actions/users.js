import axiosInstance from '../api';
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  GET_USER_INFO,
  CLEAR_LISTINGS,
  ERROR,
} from './types';

export const login = (email, password) => (dispatch) => {
  axiosInstance
    .post('/auth/login', {
      email: email,
      password: password,
    })
    .then((res) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: LOGIN_FAIL,
      });
    });
};

export const register = ({ username, email, password }) => (dispatch) => {
  axiosInstance
    .post('/auth/register', {
      username: username,
      email: email,
      password: password,
    })
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: ERROR,
        payload: err.response.data,
      });
    });
};

export const getUserInfo = (dispatch) => {
  axiosInstance
    .get('/auth/getuserinfo')
    .then((res) => {
      dispatch({
        type: GET_USER_INFO,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err); //need to dispatch an error message here
    });
};

export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT_SUCCESS });
  dispatch({ type: CLEAR_LISTINGS });
};
