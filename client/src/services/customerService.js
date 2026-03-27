import api from "./api";

/*
----------------------------------------
Get all customers for a business
----------------------------------------
GET /api/businesses/:businessId/customers
*/
export const getCustomers = async (businessId) => {
  const response = await api.get(`/businesses/${businessId}/customers`);
  return response.data;
};


/*
----------------------------------------
Create customer
----------------------------------------
POST /api/businesses/:businessId/customers
*/
export const createCustomer = async (businessId, data) => {
  const response = await api.post(
    `/businesses/${businessId}/customers`,
    data
  );
  return response.data;
};


/*
----------------------------------------
Update customer
----------------------------------------
PUT /api/businesses/:businessId/customers/:id
*/
export const updateCustomer = async (businessId, id, data) => {
  const response = await api.put(
    `/businesses/${businessId}/customers/${id}`,
    data
  );
  return response.data;
};


/*
----------------------------------------
Delete customer (soft delete backend)
----------------------------------------
DELETE /api/businesses/:businessId/customers/:id
*/
export const deleteCustomer = async (businessId, id) => {
  const response = await api.delete(
    `/businesses/${businessId}/customers/${id}`
  );
  return response.data;
};