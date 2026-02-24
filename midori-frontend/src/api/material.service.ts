import api from "./axios";

export const getMaterials = async () => {
  const response = await api.get("/materials"); 
  return response.data;
};