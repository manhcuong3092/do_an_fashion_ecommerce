import axios from 'axios';
import { END_POINT } from '~/config';
import { ADD_TO_CART, GET_USER_CART, REMOVE_ITEM_CART, UPDATE_ITEM_CART } from '../types/cartActionTypes';

export const getUserCart = (user) => async (dispatch, getState) => {
  if (!user) {
    dispatch({
      type: GET_USER_CART,
      payload: {
        cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
      },
    });
    return;
  }

  let cart;
  try {
    const { data } = await axios.get(`${END_POINT}/api/v1/cart`, { withCredentials: true });
    cart = data.cart;
  } catch (error) {
    console.log('aaaa');
    const { result } = await axios.post(`${END_POINT}/api/v1/cart`, { withCredentials: true });
    cart = result.cart;
  }
  dispatch({
    type: GET_USER_CART,
    payload: {
      cartItems: cart.cartItems,
    },
  });

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const addItemToCart = (productItem, quantity, user) => async (dispatch, getState) => {
  dispatch({
    type: ADD_TO_CART,
    payload: {
      productItem,
      quantity,
    },
  });

  if (user) {
    await axios.put(`${END_POINT}/api/v1/cart`, { cartItems: getState().cart.cartItems }, { withCredentials: true });
  } else {
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
  }
};

export const updateItemInCart = (productItem, quantity, user) => async (dispatch, getState) => {
  dispatch({
    type: UPDATE_ITEM_CART,
    payload: {
      productItem,
      quantity,
    },
  });

  if (user) {
    await axios.put(`${END_POINT}/api/v1/cart`, { cartItems: getState().cart.cartItems }, { withCredentials: true });
  } else {
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
  }
};

export const removeItemFromCart = (productItemId, user) => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_ITEM_CART,
    payload: { productItemId },
  });

  if (user) {
    await axios.put(`${END_POINT}/api/v1/cart`, { cartItems: getState().cart.cartItems }, { withCredentials: true });
  } else {
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
  }
};
