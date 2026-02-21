
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
  return axios.post("/login", data);
}

export async function register(data: RegisterData) {
  return axios.post("/register", data);
}

export async function fetchUser() {
  return axios.get("/user");
}

export async function logout() {
  try {
    await axios.post("/logout");
  } catch {}
  localStorage.removeItem("access_token");
  localStorage.removeItem("user");
}