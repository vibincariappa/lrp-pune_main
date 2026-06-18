import { create } from "zustand";
import * as authService from "../service/authService";

const useAuthStore = create((set, get) => ({
  user: null,
  role: null,
  accessToken: null,
  isAuthenticated: false,
  isCheckingSession: true,

  setToken: (token) => set({ accessToken: token }),

  login: async (credentials) => {
    try {
      const response = await authService.login(credentials);
      const { admin } = response.data;
      set({
        user: admin,
        role: admin.role,
        isAuthenticated: true,
        isCheckingSession: false
      });
      return admin;
    } catch (error) {
      set({
        user: null,
        role: null,
        isAuthenticated: false,
        isCheckingSession: false
      });
      throw error;
    }
  },

  logout: async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error("Logout failed on server:", error);
    } finally {
      set({
        user: null,
        role: null,
        accessToken: null,
        isAuthenticated: false,
        isCheckingSession: false
      });
    }
  },

  checkSession: async () => {
    try {
      const response = await authService.checkSession();
      const { admin } = response.data;
      set({
        user: admin,
        role: admin.role,
        isAuthenticated: true,
        isCheckingSession: false
      });
    } catch (error) {
      set({
        user: null,
        role: null,
        isAuthenticated: false,
        isCheckingSession: false
      });
    }
  }
}));

export default useAuthStore;