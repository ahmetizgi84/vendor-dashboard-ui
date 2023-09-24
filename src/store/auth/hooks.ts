import { useSelector } from "react-redux";
import { RootState } from "..";

export const useAuth = () => useSelector((state: RootState) => state.auth);
// export const useAuthLoading = () => useSelector((state: RootState) => state.auth.isLoading);
// export const useUsername = () => useSelector((state: RootState) => state.auth.username);
