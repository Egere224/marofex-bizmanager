import { registerUser, loginUser } from "./auth.service.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { sendSuccess } from "../../utils/response.js";

/**
 * Register Controller
 */
export const registerController = asyncHandler(async (req, res) => {
  const { full_name, email, password, phone } = req.body;

  const user = await registerUser(full_name, email, password, phone);

  sendSuccess(res, user, "User registered successfully", 201);
});


export const loginController = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const data = await loginUser(email, password);

  sendSuccess(res, data, "Login successful");
});