import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './redux/store';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GOOGLE_CLIENT_ID } from './constants/google';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

import axios from 'axios';
import { PAYPAL_CLIENT } from './constants/payment';

axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken')
  ? `Bearer ${localStorage.getItem('jwtToken')}`
  : '';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <PayPalScriptProvider options={{ "client-id": PAYPAL_CLIENT }}>
        <App />
      </PayPalScriptProvider>
    </GoogleOAuthProvider>
    ;
  </Provider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
