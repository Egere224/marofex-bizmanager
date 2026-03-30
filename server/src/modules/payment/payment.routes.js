import express from "express";
import { protect } from "../auth/auth.middleware.js";
import upload from "../../middleware/upload.js";
import { createPaymentRequest } from "./payment.controller.js";

const router = express.Router();

router.post(
  "/request",
  protect,
  upload.single("proof"),
  createPaymentRequest
);

export default router;