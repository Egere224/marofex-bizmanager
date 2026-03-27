import express from "express";
import { authMiddleware } from "../../middleware/auth.middleware.js";
import { verifyBusinessOwnership } from "../../middleware/ownership.middleware.js";
import {
  checkSubscription,
  requireActiveSubscription
} from "../../middleware/subscription.middleware.js";

import {
  createCustomerController,
  getCustomersController,
  updateCustomerController,
  deleteCustomerController
} from "./customers.controller.js";

const router = express.Router({ mergeParams: true });

router.use(authMiddleware);
router.use(verifyBusinessOwnership);
router.use(checkSubscription);

// Read allowed if subscription expired
router.get("/", getCustomersController);

// Write requires active subscription
router.post("/", requireActiveSubscription, createCustomerController);
router.put("/:id", requireActiveSubscription, updateCustomerController);
router.delete("/:id", requireActiveSubscription, deleteCustomerController);

export default router;