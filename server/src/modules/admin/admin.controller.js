import {
  getAllPaymentsService,
  approvePaymentService,
} from "./admin.service.js";

export const getPayments = async (req, res, next) => {
  try {
    const payments = await getAllPaymentsService();

    res.json({
      success: true,
      data: payments,
    });
  } catch (error) {
    next(error);
  }
};

export const approvePayment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const adminId = req.user.id;

    const result = await approvePaymentService(id, adminId);

    res.json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    next(error);
  }
};