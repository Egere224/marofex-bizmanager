import api from "./api";

export const getProducts = async (businessId, params) => {
 const response = await api.get(`/businesses/${businessId}/products`, { params });
 return response.data;
};

export const createProduct = async (businessId, data) => {
 const response = await api.post(`/businesses/${businessId}/products`, data);
  return response.data;
};

export const updateProduct = async (businessId, id, data) => {
  const response = await api.put(`/businesses/${businessId}/products/${id}`, data);
   return response.data;
};

export const deleteProduct = async (businessId, id) => {
  const response = await api.delete(`/businesses/${businessId}/products/${id}`);
   return response.data;
};
