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
