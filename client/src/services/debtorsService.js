import api from "./api";

export const getDebtors = async (businessId) => {
  const response = await api.get(`/businesses/${businessId}/sales/debtors`);
   return response.data;
};

export const getCustomerDebts = async (businessId, customerId) => {
  const response = await api.get(
    `/businesses/${businessId}/sales/debtors/${customerId}`
  );
   return response.data;
};