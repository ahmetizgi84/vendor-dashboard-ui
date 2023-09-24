import { TLoginData } from "@/types";
import { _setAuthLoading, _setLoginData } from ".";
import store from "..";

export const setLoginData = (data: TLoginData | null) => store.dispatch(_setLoginData(data));
export const setAuthLoading = (data: boolean) => store.dispatch(_setAuthLoading(data));
