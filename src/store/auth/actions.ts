import store from "../../store";
import { _setAuthState } from "../../store/auth/index";

export const setAuthState = (data: boolean) => store.dispatch(_setAuthState(data));
