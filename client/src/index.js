import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from "react-redux";
import { store } from "./store";

import dotenv from 'dotenv';  //deploy
import axios from 'axios';

dotenv.config();

// axios.defaults.baseURL = 'http://localhost:3001';  //deploy (descomentar para trabajar en localhost)
axios.defaults.baseURL = 'https://pokemon-backend-production-f73e.up.railway.app/';  //deploy (descomentar para trabajar en deploy)

ReactDOM.render(
  <Provider store={store}>
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  </Provider>,
  document.getElementById('root')
  );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
