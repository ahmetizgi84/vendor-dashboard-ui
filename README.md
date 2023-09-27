## Init RTK

- `yarn add @reduxjs/toolkit react-redux`

- `store/index.ts`

  ```js
  import { configureStore } from "@reduxjs/toolkit";
  import auth from "./auth";

  export type RootState = ReturnType<typeof store.getState>;

  const store = configureStore({
    reducer: {
      auth,
    },
  });

  export default store;
  ```

- store/auth/index.ts

  ```js
  import { createSlice, PayloadAction } from "@reduxjs/toolkit";

  interface IAuthState {
    isAuthenticated: boolean;
    username: string | null;
  }

  const initialState = {
    isAuthenticated: false,
    username: null,
  };

  const auth = createSlice({
    name: "auth",
    initialState,
    reducers: {
      _setAuthState: (state, action: PayloadAction<boolean>) => {
        state.isAuthenticated = action.payload;
      },
    },
  });

  export const { _setAuthState } = auth.actions;
  export default auth.reducer;
  ```

- main.ts

  ```js
  import { Provider } from "react-redux";

  import AppRouter from "./Router";
  import store from "./store";

  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <Provider store={store}>
        <AppRouter />
      </Provider>
    </React.StrictMode>
  );
  ```

- store/auth/actions.ts

  ```js
  import store from "../../store";
  import { _setAuthState } from "../../store/auth/index";

  export const setAuthState = (data: boolean) => store.dispatch(_setAuthState(data));
  ```

- usage w/ hooks

  ```js
  import { useSelector } from "react-redux";
  import { RootState } from "../../store";

  export const useAuth = () => useSelector((state: RootState) => state.auth.isAuthenticated);
  export const useUsername = () => useSelector((state: RootState) => state.auth.username);
  ```

## react-router-dom v6

- `yarn add react-router-dom`

- Router.tsx

#### react router dom redux authenticate with cache

When the `Login` page, which is a child of the layout, is loaded into the DOM, the `loader` function is triggered. Within this function, necessary checks are performed to determine whether the user is logged in or not. Accordingly, if the user has logged in, they are redirected to the `Dashboard` page; otherwise, they remain on the login page.

```js
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
    Component: AuthLayout, // AuthLayout children will be add as an Outlet
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
```
