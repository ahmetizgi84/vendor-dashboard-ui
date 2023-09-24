import { createBrowserRouter, RouterProvider, redirect } from "react-router-dom";

import { Login, Dashboard, Register, ForgotPassword } from "@/pages";
import store from "@/store";
import AuthLayout from "@/layouts/AuthLayout";
import MainLayout from "@/layouts/MainLayout";

const { loginData } = store.getState().auth;

const router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    loader() {
      return { user: loginData?.user.name };
    },
    Component: AuthLayout,
    children: [
      {
        index: true,
        loader: loginLoader,
        Component: Login,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
    ],
  },
  {
    path: "/dashboard",
    loader: protectedLoader,
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Dashboard,
      },
    ],
  },
]);

const Router = () => {
  return <RouterProvider router={router} fallbackElement={<p>Initial Load...</p>} />;
};

export default Router;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function loginLoader() {
  const loginData = store.getState().auth.loginData;
  if (loginData != null) {
    return redirect("/dashboard");
  }
  return null;
}

function protectedLoader() {
  const loginData = store.getState().auth.loginData;
  if (loginData == null) {
    return redirect("/");
  }
  return null;
}
