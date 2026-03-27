import { asyncHandler } from "../../utils/asyncHandler.js";
import { sendSuccess } from "../../utils/response.js";
import { getDebtors, getCustomerDebts } from "./debtors.service.js";

export const getDebtorsController = asyncHandler(async (req, res) => {
  const businessId = req.params.businessId;
  const userId = req.user.id;

  const debtors = await getDebtors(businessId, userId);

  sendSuccess(res, debtors, "Debtors fetched successfully");
});


export const getCustomerDebtsController = asyncHandler(async (req, res) => {
  const businessId = req.params.businessId;
  const customerId = req.params.customerId;
  const userId = req.user.id;

  const debts = await getCustomerDebts(
    businessId,
    customerId,
    userId
  );

  sendSuccess(res, debts, "Customer debts fetched successfully");
});