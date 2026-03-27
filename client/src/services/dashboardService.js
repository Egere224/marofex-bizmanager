import api from "./api";

export const getDashboardSummary = async (businessId) => {
  const response = await api.get(`/businesses/${businessId}/dashboard`);
  return response.data;
};