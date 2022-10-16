import { ADD_TO_CART, REMOVE_ITEM_CART } from '../types/cartActionTypes';
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
      const isItemExist = state.cartItems.find(
        (i) => i.product._id === item.product._id && i.size._id === item.size._id && i.color._id === item.color._id,
      );
      if (isItemExist) {
        return {
          ...state,
          cartItems: state.cartItems.map((i) =>
            i.product._id === item.product._id && i.size._id === item.size._id && i.color._id === item.color._id
              ? item
              : i,
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    case REMOVE_ITEM_CART:
      const { productId, colorId, sizeId } = action.payload;
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (i) => i.product._id !== productId && i.size._id !== sizeId && i.color._id !== colorId,
        ),
      };
    default:
      return state;
  }
};
