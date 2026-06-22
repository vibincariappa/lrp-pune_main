import apiClient from "./apiClient";

/**
 * Uploads a document (PDF, CSV, TXT) to the backend for metrics extraction.
 * @param {File} file - The file to upload
 */
export const uploadDocument = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await apiClient.post("/api/upload", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
    return response.data;
};

/**
 * Retrieves the history of document upload logs.
 */
export const getUploadLogs = async () => {
    const response = await apiClient.get("/api/upload/logs");
    return response.data;
};

/**
 * Confirms and syncs staged AI-extracted metrics to live PillarData.
 * @param {string} id - The ID of the upload log
 */
export const syncUploadMetrics = async (id) => {
    const response = await apiClient.post(`/api/upload/sync/${id}`);
    return response.data;
};

/**
 * Builds the URL to download a stored document.
 * @param {string} id - The ID of the upload log
 */
export const getDownloadUrl = (id) => {
    const baseUrl = import.meta.env.VITE_API_URL;
    return `${baseUrl}/api/upload/download/${id}`;
};

/**
 * Builds the URL to view a stored document inline in the browser.
 * @param {string} id - The ID of the upload log
 */
export const getViewUrl = (id) => {
    const baseUrl = import.meta.env.VITE_API_URL;
    return `${baseUrl}/api/upload/view/${id}`;
};