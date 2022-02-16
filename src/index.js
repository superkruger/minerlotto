import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux'
import Main from "./Main";
import { configureStore } from './store/configureStore';
import "./index.css";
 
ReactDOM.render(
  <Provider store = {configureStore()}>
    <Main/>
  </Provider>, 
  document.getElementById("root")
);