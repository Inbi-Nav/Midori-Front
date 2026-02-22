import axios from "./axios";

export const getMyOrders = () => axios.get("/orders/me");

export const getProviderOrders = () => axios.get("/orders");

export const updateOrderStatus = (id: number, status: string) =>
  axios.patch(`/orders/${id}/status`, { status });

export const cancelOrder = (orderId: number) =>
  axios.patch(`/orders/${orderId}/cancel`);

export const createOrder = (data: any) =>
  axios.post("/orders", data);