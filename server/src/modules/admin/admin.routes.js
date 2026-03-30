import express from "express";
import { protect, isAdmin } from "../../middleware/auth.middleware.js";
import {
  getPayments,
  approvePayment
} from "./admin.controller.js";

const router = express.Router();

router.get("/payments", protect, isAdmin, getPayments);
router.patch("/payments/:id/approve", protect, isAdmin, approvePayment);

export default router;