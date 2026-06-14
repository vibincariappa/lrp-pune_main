import apiClient from "./apiClient";

export const getPillars = async () => {
  const response = await apiClient.get("/api/pillars");
  return response.data;
};

export const getPillar = async (id) => {
  const response = await apiClient.get(`/api/pillars/${id}`);
  return response.data;
};