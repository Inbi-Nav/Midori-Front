import axios from "axios";
import { logout } from "./auth.service";
import { getToken } from "../utils/auth.utils";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = getToken();
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("ERROR STATUS:", error.response?.status);
    console.log("ERROR DATA:", error.response?.data);
    return Promise.reject(error);
  }
);

export default axiosInstance;