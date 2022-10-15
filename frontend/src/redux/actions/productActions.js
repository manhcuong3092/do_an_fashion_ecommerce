import axios from 'axios';
import { ALL_PRODUCTS_FAIL, ALL_PRODUCTS_REQUEST, ALL_PRODUCTS_SUCCESS } from '../types/productActionType';

export const getProducts =
  (keyword = '', currentPage = 3, category) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_PRODUCTS_REQUEST });
      let link = `/api/v1/products?page=2`;

      if (keyword) {
        link += `&keyword=${keyword}`;
      }

      if (category) {
        link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&category=${category}`;
      }

      console.log(link);

      const { data } = await axios.get(link);
      dispatch({
        type: ALL_PRODUCTS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_PRODUCTS_FAIL,
        payload: error.response.data.message,
      });
    }
  };
