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
      const itemExistIndex = state.cartItems.findIndex(
        (i) => i.product._id === item.product._id && i.size._id === item.size._id && i.color._id === item.color._id,
      );
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
      const { productId, colorId, sizeId } = action.payload;
      console.log(state.cartItems);
      console.log(
        state.cartItems.filter((i) => i.product._id !== productId && i.size._id !== sizeId && i.color._id !== colorId),
      );
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (i) => i.product._id !== productId || i.size._id !== sizeId || i.color._id !== colorId,
        ),
      };
    case UPDATE_ITEM_CART:
      const cartItem = action.payload;
      const existIndex = state.cartItems.findIndex(
        (i) =>
          i.product._id === cartItem.product._id &&
          i.size._id === cartItem.size._id &&
          i.color._id === cartItem.color._id,
      );
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
