import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Login, Dashboard, Register, ForgotPassword } from "./pages";
import AuthLayout from "./layouts/AuthLayout";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
