import {
  createCustomer,
  getCustomersByBusiness,
  updateCustomer,
  deleteCustomer
} from "./customers.service.js";

import { asyncHandler } from "../../utils/asyncHandler.js";
import { sendSuccess } from "../../utils/response.js";


export const createCustomerController = asyncHandler(async (req, res) => {
  const { name, phone, address } = req.body;
  const businessId = req.params.businessId;
  const userId = req.user.id;

  const customer = await createCustomer(
    businessId,
    name,
    phone,
    address,
    userId
  );

  sendSuccess(res, customer, "Customer created successfully", 201);
});


export const getCustomersController = asyncHandler(async (req, res) => {
  const businessId = req.params.businessId;
  const userId = req.user.id;

  const customers = await getCustomersByBusiness(businessId, userId);

  sendSuccess(res, customers, "Customers fetched successfully");
});


export const updateCustomerController = asyncHandler(async (req, res) => {
  const { name, phone, address } = req.body;
  const customerId = req.params.id;
  const userId = req.user.id;

  const customer = await updateCustomer(
    customerId,
    name,
    phone,
    address,
    userId
  );

  sendSuccess(res, customer, "Customer updated successfully");
});


export const deleteCustomerController = asyncHandler(async (req, res) => {
  const customerId = req.params.id;
  const userId = req.user.id;

  const customer = await deleteCustomer(customerId, userId);

  sendSuccess(res, customer, "Customer deleted successfully");
});