import React from "react";
import ReactDOM from "react-dom";
import "./helpers/sass/styles.css";
import { Provider } from "react-redux";
import store from "./features/store/store";
import MainRouter from "./router/router";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <React.Fragment>
    <Provider store={store}>
      <div className="main-body">
        <BrowserRouter basename="/ihrmis">
          {/* basename="" */}

          <MainRouter />
        </BrowserRouter>
      </div>
    </Provider>
  </React.Fragment>,
  document.getElementById("root")
);
