import api from "./api";

/*
----------------------------------------
Create Sale
----------------------------------------
POST /api/businesses/:businessId/sales
*/
export const createSale = async (businessId, data) => {
  const response = await api.post(
    `/businesses/${businessId}/sales`,
    data
  );
  return response.data;
};


/*
----------------------------------------
Add item to sale
----------------------------------------
POST /api/businesses/:businessId/sales/:saleId/items
*/
export const addSaleItem = async (businessId, saleId, data) => {
  const response = await api.post(
    `/businesses/${businessId}/sales/${saleId}/items`,
    data
  );
  return response.data;
};


/*
----------------------------------------
Add payment
----------------------------------------
POST /api/businesses/:businessId/sales/payments
*/
export const addSalePayment = async (businessId, saleId, data) => {
  const response = await api.post(
    `/businesses/${businessId}/sales/${saleId}/payments`,
    data
  );
  return response.data;
};


/*
----------------------------------------
Get sale details (items + sale info)
----------------------------------------
GET /api/businesses/:businessId/sales/:saleId
*/
export const getSaleDetails = async (businessId, saleId) => {
  const response = await api.get(
    `/businesses/${businessId}/sales/${saleId}`
  );
  return response.data;
};