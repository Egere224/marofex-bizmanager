import { getDashboardSummary } from "./dashboard.service.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { sendSuccess } from "../../utils/response.js";


export const getDashboardController = asyncHandler(async (req, res) => {
  const businessId = req.params.businessId;
  const userId = req.user.id;

  const data = await getDashboardSummary(businessId, userId);

  sendSuccess(res, data, "Dashboard summary fetched successfully");
});