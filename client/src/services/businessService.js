import api from "./api";

/*
----------------------------------------
Get all businesses for the logged-in user
----------------------------------------
GET /api/businesses
*/
export const getBusinesses = async () => {
  const response = await api.get("/businesses");
  return response.data;
};


/*
----------------------------------------
Create a new business
----------------------------------------
POST /api/businesses
body: { name, currency }
*/
export const createBusiness = async (data) => {
  const response = await api.post("/businesses", data);
  return response.data;
};


/*
----------------------------------------
Delete a business
----------------------------------------
DELETE /api/businesses/:id
*/
export const deleteBusiness = async (businessId) => {
  const response = await api.delete(`/businesses/${businessId}`);
  return response.data;
};