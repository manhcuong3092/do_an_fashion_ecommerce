import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { authReducer, forgotPasswordReducer } from './reducers/authReducers';
import { productsReducer } from './reducers/productReducers';

const reducer = combineReducers({
  auth: authReducer,
  forgotPassword: forgotPasswordReducer,
  products: productsReducer,
});

let initState = {
  auth: localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : {},
};

const middleware = [thunk];
const store = createStore(reducer, initState, composeWithDevTools(applyMiddleware(...middleware)));
export default store;
