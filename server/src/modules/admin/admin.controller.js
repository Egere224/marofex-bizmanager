import {
  getAllPaymentsService,
  deleteUserService,
  getAllBusinessesService,
  getAllUsersService,
  approvePaymentService,
} from "./admin.service.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { sendSuccess } from "../../utils/response.js";

export const getPayments = asyncHandler(async (req, res) => {
  const payments = await getAllPaymentsService();

  sendSuccess(res, payments, "Payments fetched successfully");
});


export const approvePayment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const adminId = req.user.id;

  const result = await approvePaymentService(id, adminId);

  sendSuccess(res, null, result.message);
});


export const getUsers = asyncHandler(async (req, res) => {
  const users = await getAllUsersService();

  sendSuccess(res, users, "Users fetched successfully");
});


export const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const adminId = req.user.id;

  const result = await deleteUserService(id, adminId);

  sendSuccess(res, result.user, result.message);
});


export const getBusinesses = asyncHandler(async (req, res) => {
  const businesses = await getAllBusinessesService();

  sendSuccess(res, businesses, "Businesses fetched successfully");
});