import api from "./axios";
import { getToken } from "../utils/auth.utils";

export const getCategories = async () => {
  try {
    const token = getToken();
    
    const response = await api.get("/categories", {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    console.log("Categorías recibidas:", response.data);
    
    if (response.data && response.data.data) {
      return { data: response.data.data };
    }
    if (Array.isArray(response.data)) {
      return { data: response.data };
    }
    return { data: response.data || [] };
  } catch (error) {
    console.error("Error fetching categories:", error);
    return { data: [] };
  }
};

export const getCategory = async (id: number) => {
  const token = getToken();
  const response = await api.get(`/categories/${id}`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return response.data;
};

export const createCategory = async (data: { name: string; description?: string }) => {
  const token = getToken();
  const response = await api.post("/categories", data, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return response.data;
};

export const updateCategory = async (id: number, data: { name: string; description?: string }) => {
  const token = getToken();
  const response = await api.put(`/categories/${id}`, data, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return response.data;
};

export const deleteCategory = async (id: number) => {
  const token = getToken();
  const response = await api.delete(`/categories/${id}`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return response.data;
};