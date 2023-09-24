import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IAuthState {
  isAuthenticated: boolean;
  username: string | null;
}

const initialState: IAuthState = {
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
    _setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
  },
});

export const { _setAuthState, _setUsername } = auth.actions;
export default auth.reducer;
