import axios from "axios";
import useAuthStore from "../store/authStore";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
  withCredentials: true, // Crucial to send HTTP-Only cookies with requests
  headers: {
    "Content-Type": "application/json"
  }
});

// Centralized error handling / Session expiration interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      const { clearUser } = useAuthStore.getState();
      clearUser(); // Clear frontend authenticated state

      // If user is currently trying to access protected staff portal pages, redirect to login
      if (
        window.location.pathname.startsWith("/team") &&
        window.location.pathname !== "/team/login"
      ) {
        window.location.href = "/team/login?expired=true";
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;