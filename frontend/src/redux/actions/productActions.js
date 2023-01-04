import axios from 'axios';
import { END_POINT } from '~/config';
import { SORT_ASC, SORT_DESC } from '~/constants/filterPrice';
import { ALL_PRODUCTS_FAIL, ALL_PRODUCTS_REQUEST, ALL_PRODUCTS_SUCCESS } from '../types/productActionType';

export const getProducts =
  (keyword = '', currentPage = 1, category, price = [null, null], color, size, gender, sort) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_PRODUCTS_REQUEST });
      let link = `${END_POINT}/api/v1/products?page=${currentPage}`;

      if (keyword) {
        link += `&keyword=${keyword}`;
      }
      if (category) {
        link += `&category=${category}`;
      }
      if (price[0]) {
        link += `&price[gte]=${price[0]}`;
      }
      if (price[1]) {
        link += `&price[lte]=${price[1]}`;
      }
      if (color) {
        link += `&color=${color}`;
      }
      if (size) {
        link += `&size=${size}`;
      }
      if (gender) {
        link += `&gender=${gender}`;
      }
      if (sort === SORT_ASC) {
        link += `&sort=asc`;
      } else if (sort === SORT_DESC) {
        link += `&sort=desc`;
      }

      const { data } = await axios.get(link, { withCredentials: true });
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
