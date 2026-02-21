import { create } from "zustand";
import { getToken, getUser, saveToken, saveUser, clearAuthData } from "../utils/auth.utils";

interface AuthState {
  token: string | null;
  user: any;
  isAuthenticated: boolean;
  role: string | null;
  setAuth: (token: string, user: any) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => {
  const token = getToken();
  const user = getUser();

  return {
    token,
    user,
    role: user?.role || null,
    isAuthenticated: !!token,

    setAuth: (token, user) => {
      saveToken(token);
      saveUser(user);
      set({
        token,
        user,
        role: user.role,
        isAuthenticated: true,
      });
    },

    logout: () => {
      clearAuthData();
      set({
        token: null,
        user: null,
        role: null,
        isAuthenticated: false,
      });
    },
  };
});