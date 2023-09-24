import { _setAuthState } from ".";
import store from "..";

export const setAuthState = (data: boolean) => store.dispatch(_setAuthState(data));
