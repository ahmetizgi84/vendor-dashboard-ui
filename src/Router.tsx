import { createBrowserRouter, RouterProvider, redirect } from "react-router-dom";

import { Login, Dashboard, Register, ForgotPassword } from "@/pages";
import store from "@/store";
import AuthLayout from "@/layouts/AuthLayout";
import MainLayout from "@/layouts/MainLayout";

const username = store.getState().auth.username;

const router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    loader() {
      return { user: username };
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
  const isAuthenticated = store.getState().auth.isAuthenticated;
  if (isAuthenticated) {
    return redirect("/dashboard");
  }
  return null;
}

function protectedLoader() {
  const isAuthenticated = store.getState().auth.isAuthenticated;
  if (!isAuthenticated) {
    return redirect("/");
  }
  return null;
}
