import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import AppRouter from "./Router";
import store from "./store";

import "antd/dist/reset.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <AppRouter />
    </Provider>
  </React.StrictMode>
);
