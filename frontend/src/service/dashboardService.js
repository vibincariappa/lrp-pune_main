import apiClient from "./apiClient";

export const getDashboard = async () => {
  const response = await apiClient.get("/api/dashboard");
  return response.data;
};
