import axios from "axios";
import { getToken } from "../utils/auth.utils";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

const publicEndpoints = [
  '/login',
  '/register',
  '/categories',
  '/products',
];

instance.interceptors.request.use((config) => {
  const isPublicEndpoint = publicEndpoints.some(endpoint => 
    config.url?.includes(endpoint)
  );
  
  if (isPublicEndpoint) {
    return config;
  }

  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default instance;