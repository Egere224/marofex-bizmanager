import express from "express";
import { protect } from "../../middleware/auth.middleware.js";
import upload from "../../middleware/upload.js";
import { createPaymentRequest } from "./payments.controller.js";

const router = express.Router();

router.post(
  "/request",
  protect,
  upload.single("proof"),
  createPaymentRequest
);

export default router;