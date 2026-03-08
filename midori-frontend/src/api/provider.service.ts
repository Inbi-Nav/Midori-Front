import axios from "./axios";

export const createProduct = (data: FormData) => {
  return axios.post("/products", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updateProduct = (id: number, data: FormData) => {
  return axios.post(`/products/${id}?_method=PUT`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteProduct = (id: number) =>
  axios.delete(`/products/${id}`);

export const getOrders = () =>
  axios.get("/orders");

export const createCategory = (data: any) =>
  axios.post("/categories", data);