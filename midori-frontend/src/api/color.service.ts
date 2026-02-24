import api from "./axios";

export const getColors = async () => {
  const response = await api.get("/colors"); // Ajusta la ruta según tu backend
  return response.data;
};