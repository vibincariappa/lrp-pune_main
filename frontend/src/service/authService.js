import apiClient from "./apiClient";

export const login = async (credentials) => {
  // credentials can have { email, password } or { username, password }
  const response = await apiClient.post("/auth/login", credentials);
  return response.data;
};

export const logout = async () => {
  const response = await apiClient.post("/auth/logout");
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await apiClient.get("/auth/me");
  return response.data;
};