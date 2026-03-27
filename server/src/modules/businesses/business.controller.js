import { getUserBusinesses, createBusinessService, deleteBusinessService } from "./business.service.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { sendSuccess } from "../../utils/response.js";

export const getUserBusinessesController = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const businesses = await getUserBusinesses(userId);

  sendSuccess(res, businesses, "Businesses fetched successfully");
});

export const createBusinessController = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { name, currency } = req.body;

  const business = await createBusinessService(userId, name, currency);

  sendSuccess(res, business, "Business created successfully");
});

export const deleteBusinessController = asyncHandler(async (req, res) => {

  const businessId = req.params.id;
  const userId = req.user.id;

  const deleted = await deleteBusinessService(businessId, userId);

  if (!deleted) {
    throw new Error("Business not found");
  }

  sendSuccess(res, null, "Business deleted successfully");

});