// admin.controller.js
import { getAllPaymentsService } from "./admin.service.js";
import { approvePaymentService } from "./admin.service.js";

export const getPayments = async (req, res) => {
  const payments = await getAllPaymentsService();
  res.json(payments);
};

export const approvePayment = async (req, res) => {
  const { id } = req.params;
  const adminId = req.user.id;

  const result = await approvePaymentService(id, adminId);

  res.json(result);
};