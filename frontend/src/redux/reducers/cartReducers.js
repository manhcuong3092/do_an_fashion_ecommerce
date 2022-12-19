import { ADD_TO_CART, REMOVE_ITEM_CART, UPDATE_ITEM_CART } from '../types/cartActionTypes';
import { GET_USER_CART } from '../types/cartActionTypes';

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case GET_USER_CART:
      return {
        ...state,
        cartItems: action.payload.cartItems,
      };
    case ADD_TO_CART:
      const item = action.payload;
      const itemExistIndex = state.cartItems.findIndex((i) => i.productItem._id === item.productItem._id);
      if (itemExistIndex > -1) {
        state.cartItems[itemExistIndex].quantity += item.quantity;
        return {
          ...state,
          cartItems: state.cartItems,
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    case REMOVE_ITEM_CART:
      const { productItemId } = action.payload;
      console.log(state.cartItems);
      console.log(state.cartItems.filter((i) => i.productItem._id !== productItemId));
      return {
        ...state,
        cartItems: state.cartItems.filter((i) => i.productItem._id !== productItemId),
      };
    case UPDATE_ITEM_CART:
      const cartItem = action.payload;
      const existIndex = state.cartItems.findIndex((i) => i.productItem._id === cartItem.productItem._id);
      if (existIndex > -1) {
        state.cartItems[existIndex] = cartItem;
        return {
          ...state,
          cartItems: state.cartItems,
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    default:
      return state;
  }
};
