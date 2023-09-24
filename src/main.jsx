import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import store from "@/store";
import Router from "@/Router";

import "antd/dist/reset.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router />
    </Provider>
  </React.StrictMode>
);
