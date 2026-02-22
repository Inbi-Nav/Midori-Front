import { create } from "zustand";
import {
  getToken,
  getUser,
  saveToken,
  saveUser,
  clearAuthData,
} from "../utils/auth.utils";
import { logoutRequest } from "../api/user.service";

interface AuthState {
  token: string | null;
  user: any;
  isAuthenticated: boolean;
  role: string | null;
  setAuth: (token: string, user: any) => void;
  logout: () => Promise<void>;
  updateUser: (user: any) => void;
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

    updateUser: (user) => {
      saveUser(user);
      set({
        user,
        role: user.role,
      });
    },

    logout: async () => {
      try {
        await logoutRequest();
      } catch (error) {
        
      }
    
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