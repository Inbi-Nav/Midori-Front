import axios from "./axios";

export const getMyOrders = () => axios.get("/orders/me");

export const getProviderOrders = () => axios.get("/orders");

export const updateOrderStatus = (id: number, status: string) =>
  axios.patch(`/orders/${id}/status`, { status });