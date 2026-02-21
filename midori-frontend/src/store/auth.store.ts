import { create } from "zustand";
import { getToken, getUser, saveToken, saveUser, clearAuthData } from "../utils/auth.utils";

interface AuthState {
  token: string | null;
  user: any;
  isAuthenticated: boolean;
  setAuth: (token: string, user: any) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: getToken(),
  user: getUser(),
  isAuthenticated: !!getToken(),
  setAuth: (token, user) => {
    saveToken(token);
    saveUser(user);
    set({ token, user, isAuthenticated: true });
  },
  logout: () => {
    clearAuthData();
    set({ token: null, user: null, isAuthenticated: false });
  },
}));