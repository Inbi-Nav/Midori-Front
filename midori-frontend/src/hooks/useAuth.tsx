import { create } from "zustand";

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  user: any;
  setToken: (token: string) => void;
  logout: () => void;
}

export const useAuth = create<AuthState>((set) => ({
  isAuthenticated: !!localStorage.getItem("access_token"),
  token: localStorage.getItem("access_token"),
  user: null,
  setToken: (token) => {
    localStorage.setItem("access_token", token);
    set({ token, isAuthenticated: true });
  },
  logout: () => {
    localStorage.removeItem("access_token");
    set({ token: null, isAuthenticated: false });
  },
}));