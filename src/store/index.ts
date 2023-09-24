import { configureStore } from "@reduxjs/toolkit";
import auth from "./auth";

export type RootState = ReturnType<typeof store.getState>;

const store = configureStore({
  reducer: {
    auth,
  },
});

export default store;
