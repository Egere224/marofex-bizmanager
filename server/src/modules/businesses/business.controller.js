import { getUserBusinesses, createBusinessService, getBusinessByIdService, deleteBusinessService } from "./business.service.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { sendSuccess } from "../../utils/response.js";

export const getUserBusinessesController = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const businesses = await getUserBusinesses(userId);

  sendSuccess(res, businesses, "Businesses fetched successfully");
});

export const createBusinessController = asyncHandler(async (req, res) => {
  console.log("USER:", req.user);
console.log("BODY:", req.body);
  const userId = req.user.id;
  const { name, currency } = req.body;

  const business = await createBusinessService(userId, name, currency);

  sendSuccess(res, business, "Business created successfully");
});

export const getBusinessByIdController = asyncHandler(async (req, res) => {
  const businessId = req.params.id;
  const userId = req.user.id;

  const business = await getBusinessByIdService(businessId, userId);
  console.log("user id", userId);
  console.log("business id", businessId);
  if (!business) {
    return res.status(404).json({ message: "Business not found" });
  }

  sendSuccess(res, business, "Business fetched successfully");
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