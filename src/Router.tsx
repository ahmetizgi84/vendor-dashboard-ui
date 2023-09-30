import { createBrowserRouter, RouterProvider, redirect } from "react-router-dom";

import store from "@/store";
import AuthLayout from "@/layouts/AuthLayout";
import MainLayout from "@/layouts/MainLayout";
import { Suspense, lazy } from "react";

const { loginData } = store.getState().auth;

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Billing = lazy(() => import("./pages/Billing"));
const Profile = lazy(() => import("./pages/Profile"));
const Tables = lazy(() => import("./pages/Tables"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));

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
  {
    path: "/tables",
    loader: protectedLoader,
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Tables,
      },
    ],
  },
  {
    path: "/billing",
    loader: protectedLoader,
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Billing,
      },
    ],
  },
  {
    path: "/profile",
    loader: protectedLoader,
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Profile,
      },
    ],
  },
]);

const Router = () => {
  return (
    <Suspense fallback={<Gatherer />}>
      <RouterProvider router={router} fallbackElement={<p>Initial Load...</p>} />
    </Suspense>
  );
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

function Gatherer() {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <p>Gathering components</p>
    </div>
  );
}
