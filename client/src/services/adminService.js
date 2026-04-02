import api from "./api";

// GET ALL PAYMENTS
export const getPayments = async () => {
  const res = await api.get("/admin/payments");
  return res.data;
};

// APPROVE PAYMENT
export const approvePayment = async (id) => {
  const res = await api.patch(`/admin/payments/${id}/approve`);
  return res.data;
};


export const getUsers = async () => {
  const res = await api.get("/admin/users");
  return res.data;
};

export const deleteUser = async (id) => {
  const res = await api.delete(`/admin/users/${id}`);
  return res.data;
};

export const getBusinesses = async () => {
  const res = await api.get("/admin/businesses");
  return res.data;
};