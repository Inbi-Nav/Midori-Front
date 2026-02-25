import axios from "./axios";

export const getUsers = () => axios.get("/users");
export const updateUser = (id: number, data: any) =>
  axios.put(`/users/${id}`, data);
export const deleteUser = (id: number) =>
  axios.delete(`/users/${id}`);

export const getProviderRequests = () =>
  axios.get("/provider-request");

export const approveProvider = (id: number) =>
  axios.patch(`/users/${id}/approve-provider`);

export const getStats = () => axios.get("/stats");

export const getAllProducts = () => axios.get("/products");
export const getAllOrders = () => axios.get("/admin/orders");

export const declineProvider = (id: number) =>
  axios.patch(`/users/${id}/decline-provider`);
