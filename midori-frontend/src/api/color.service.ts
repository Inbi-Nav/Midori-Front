import api from "./axios";

export const getColors = async () => {
  const response = await api.get("/colors"); 
  return response.data;
};