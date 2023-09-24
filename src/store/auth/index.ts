import { TLoginData } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IAuthState {
  isLoading: boolean;
  loginData: TLoginData | null;
}

const initialState: IAuthState = {
  isLoading: false,
  loginData: null,
};

const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    _setLoginData: (state, action: PayloadAction<TLoginData>) => {
      state.loginData = action.payload;
    },
    _setAuthLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { _setLoginData, _setAuthLoading } = auth.actions;
export default auth.reducer;
