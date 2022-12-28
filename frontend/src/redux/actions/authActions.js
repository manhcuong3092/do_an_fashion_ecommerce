import axios from 'axios';
import { END_POINT } from '~/config';
import {
  CHECK_COOKIE_FAIL,
  CHECK_COOKIE_SUCCESS,
  CLEAR_ERRORS,
  FORGOT_PASSWORD_FAIL,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_FAIL,
  LOGOUT_SUCCESS,
  NEW_PASSWORD_FAIL,
  NEW_PASSWORD_REQUEST,
  NEW_PASSWORD_SUCCESS,
  REGISTER_USER_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
} from '../types/authActionTypes';

//Login
export const login = (email, password) => async (dispatch, getState) => {
  try {
    dispatch({ type: LOGIN_REQUEST });
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    };
    const { data } = await axios.post(`${END_POINT}/api/v1/login`, { email, password }, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: data.user,
    });
    localStorage.setItem('auth', JSON.stringify(getState().auth));
    localStorage.setItem('jwtToken', data.token);
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response.data.errMessage,
    });
  }
};

// Google Login
export const googleLogin = (credentialResponse) => async (dispatch, getState) => {
  try {
    dispatch({ type: LOGIN_REQUEST });
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    };
    const { data } = await axios.post(`${END_POINT}/api/v1/googleLogin`, { credentialResponse }, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: data.user,
    });
    localStorage.setItem('auth', JSON.stringify(getState().auth));
    localStorage.setItem('jwtToken', data.token);
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error,
    });
  }
};

//Logout user
export const logout = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${END_POINT}/api/v1/logout`, { withCredentials: true });
    dispatch({
      type: LOGOUT_SUCCESS,
      payload: data.user,
    });
    localStorage.setItem('auth', JSON.stringify({}));
    localStorage.setItem('jwtToken', '');
  } catch (error) {
    dispatch({
      type: LOGOUT_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Check cookie
export const checkCookie = () => async (dispatch, getState) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    };
    const { data } = await axios.get(`${END_POINT}/api/v1/me`, config);
    dispatch({
      type: CHECK_COOKIE_SUCCESS,
      payload: data.user,
    });
    localStorage.setItem('auth', JSON.stringify(getState().auth));
  } catch (error) {
    dispatch({
      type: CHECK_COOKIE_FAIL,
      payload: error.response.data.message,
    });
    localStorage.setItem('jwtToken', '');
  }
};

//Register
export const register = (userData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST });
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    };
    const { data } = await axios.post(`${END_POINT}/api/v1/register`, userData, config);
    dispatch({
      type: REGISTER_USER_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: REGISTER_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Forgot password
export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({ type: FORGOT_PASSWORD_REQUEST });
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.post(`${END_POINT}/api/v1/password/forgot`, email, config);
    dispatch({
      type: FORGOT_PASSWORD_SUCCESS,
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: FORGOT_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Reset password
export const resetPassword = (token, passwords) => async (dispatch) => {
  try {
    dispatch({ type: NEW_PASSWORD_REQUEST });
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.put(`${END_POINT}/api/v1/password/reset/${token}`, passwords, config);
    dispatch({
      type: NEW_PASSWORD_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: NEW_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Clear Error
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
