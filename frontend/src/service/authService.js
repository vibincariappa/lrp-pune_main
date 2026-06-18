import apiClient from "./apiClient";

export const login = (data) => {
  return apiClient.post("/auth/login", data);
};

export const logout = () => {
  return apiClient.post("/auth/logout");
};

export const checkSession = () => {
  return apiClient.get("/auth/me");
};