import React from "react";
import ReactDOM from "react-dom";
import "./helpers/sass/styles.css";
import { Provider } from "react-redux";
import store from "./features/store/store";
import MainRouter from "./router/router";
import "./config/axios_config";

ReactDOM.render(
  <React.Fragment>
    <Provider store={store}>
      <MainRouter />
    </Provider>
  </React.Fragment>,
  document.getElementById("root")
);
