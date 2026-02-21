import axios from "./axios";

export const getCategories = async () => {
  return axios.get("/categories");
};