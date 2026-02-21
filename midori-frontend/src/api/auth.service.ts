
import axios from "./axios";

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export async function login(data: LoginData) {
  return axios.post("/auth/login", data);
}

export async function register(data: RegisterData) {
  return axios.post("/auth/register", data);
}

export async function fetchUser() {
  return axios.get("/auth/user");
}

export async function logout() {
  try {
    await axios.post("/auth/logout");
  } catch {}
  localStorage.removeItem("access_token");
  localStorage.removeItem("user");
}