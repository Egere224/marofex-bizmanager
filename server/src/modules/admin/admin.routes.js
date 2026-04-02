import express from "express";
import { protect, isAdmin } from "../../middleware/auth.middleware.js";
import {
  getPayments,
  deleteUser,
  getUsers,
  getBusinesses,
  approvePayment
} from "./admin.controller.js";

const router = express.Router();

router.get("/payments", protect, isAdmin, getPayments);
router.patch("/payments/:id/approve", protect, isAdmin, approvePayment);
router.get("/users", protect, isAdmin, getUsers);
router.get("/businesses", protect, isAdmin, getBusinesses);

router.delete("/users/:id", protect, isAdmin, deleteUser);

export default router;