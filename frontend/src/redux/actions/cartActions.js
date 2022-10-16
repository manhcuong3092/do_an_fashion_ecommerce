import axios from 'axios';
import { ADD_TO_CART, GET_USER_CART, REMOVE_ITEM_CART } from '../types/cartActionTypes';

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
  const { data } = await axios.get(`/api/v1/cart`);
  if (!data.cart) {
    const { result } = await axios.post(`/api/v1/cart`);
    cart = result.cart;
  } else {
    cart = data.cart;
  }
  dispatch({
    type: GET_USER_CART,
    payload: {
      cartItems: cart.cartItems,
    },
  });

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const addItemToCart = (id, quantity) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/v1/product/${id}`);
  dispatch({
    type: ADD_TO_CART,
    payload: {
      product: data.product,
      size: data.size,
      color: data.color,
      quantity,
    },
  });

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const removeItemFromCart = (productId, colorId, sizeId) => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_ITEM_CART,
    payload: { productId, colorId, sizeId },
  });

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};
