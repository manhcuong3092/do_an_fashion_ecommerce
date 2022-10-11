import axios from 'axios';
import { 
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
  REGISTER_USER_SUCCESS 
} from "../types/authActionTypes";

//Login 
export const login = (email, password) => async (dispatch, getState) => {
  try {
    dispatch({ type: LOGIN_REQUEST });
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const { data } = await axios.post('/api/v1/login', { email, password }, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: data.user
    })
    localStorage.setItem('auth', JSON.stringify(getState().auth))
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response.data.message
    })
  }
}


//Logout user
export const logout = () => async (dispatch) => {
  try {
    const { data } = await axios.get('/api/v1/logout');
    dispatch({
      type: LOGOUT_SUCCESS,
      payload: data.user
    })
    localStorage.setItem('auth', JSON.stringify({}))
  } catch (error) {
    dispatch({
      type: LOGOUT_FAIL,
      payload: error.response.data.message
    })
  }
}

//Register
export const register = (userData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST });
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
    const { data } = await axios.post('/api/v1/register', userData, config);
    dispatch({
      type: REGISTER_USER_SUCCESS,
      payload: data.user
    })
  } catch (error) {
    dispatch({
      type: REGISTER_USER_FAIL,
      payload: error.response.data.message
    })
  }
}

// Forgot password
export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({ type: FORGOT_PASSWORD_REQUEST });
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const { data } = await axios.post('/api/v1/password/forgot', email, config);
    dispatch({
      type: FORGOT_PASSWORD_SUCCESS,
      payload: data.message
    })
  } catch (error) {
    dispatch({
      type: FORGOT_PASSWORD_FAIL,
      payload: error.response.data.message
    })
  }
}

// Reset password
export const resetPassword = (token, passwords) => async (dispatch) => {
  try {
    dispatch({ type: NEW_PASSWORD_REQUEST });
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const { data } = await axios.put(`/api/v1/password/reset/${token}`, passwords, config);
    dispatch({
      type: NEW_PASSWORD_SUCCESS,
      payload: data.success
    })
  } catch (error) {
    dispatch({
      type: NEW_PASSWORD_FAIL,
      payload: error.response.data.message
    })
  }
}

//Clear Error
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS
  })
}