import { useSelector } from "react-redux";
import { RootState } from "..";

export const useAuth = () => useSelector((state: RootState) => state.auth.isAuthenticated);
export const useUsername = () => useSelector((state: RootState) => state.auth.username);
