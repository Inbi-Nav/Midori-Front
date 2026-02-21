import axios from "./axios";

interface ProductParams {
  category_id?: number;
  min_price?: number;
  max_price?: number;
}

export const getProducts = async (params?: ProductParams) => {
  return axios.get("/products", { params });
};