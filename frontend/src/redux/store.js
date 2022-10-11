import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { authReducer, forgotPasswordReducer } from './reducers/authReducers';

const reducer = combineReducers({
  auth: authReducer,
  forgotPassword: forgotPasswordReducer
});

let initState = {

};

const middleware = [thunk];
const store = createStore(reducer, initState, composeWithDevTools(applyMiddleware(...middleware)));
export default store;