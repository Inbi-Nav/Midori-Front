import axios from "./axios";

export const getMe = () => axios.get("/users/me");

export const updateProfile = (data: any) =>
  axios.put("/users/me", data);

export const changePassword = (data: any) =>
  axios.patch("/users/me/password", data);

export const logoutRequest = () =>
  axios.post("/logout");