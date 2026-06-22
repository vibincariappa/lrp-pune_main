import { create } from "zustand";
import { login as apiLogin, logout as apiLogout, getCurrentUser as apiMe } from "../service/authService";

const useAuthStore = create((set) => ({
  user: null,
  role: null,
  isAuthenticated: false,
  isCheckingSession: true, // Set to true initially

  setUser: (user) => set({
    user,
    role: user ? user.role : null,
    isAuthenticated: !!user,
    isCheckingSession: false
  }),

  clearUser: () => set({
    user: null,
    role: null,
    isAuthenticated: false,
    isCheckingSession: false
  }),

  setCheckingSession: (val) => set({ isCheckingSession: val }),

  checkSession: async () => {
    try {
      const data = await apiMe();
      if (data && data.success && data.admin) {
        set({
          user: data.admin,
          role: data.admin.role,
          isAuthenticated: true,
          isCheckingSession: false
        });
        return data.admin;
      }
    } catch (error) {
      // 401 response or network error clears session
    } finally {
      set({ isCheckingSession: false });
    }
    return null;
  },

  login: async (credentials) => {
    const data = await apiLogin(credentials);
    if (data && data.success && data.admin) {
      set({
        user: data.admin,
        role: data.admin.role,
        isAuthenticated: true,
        isCheckingSession: false
      });
      return data;
    }
    throw new Error(data.message || "Invalid login response");
  },

  logout: async () => {
    try {
      await apiLogout();
    } finally {
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