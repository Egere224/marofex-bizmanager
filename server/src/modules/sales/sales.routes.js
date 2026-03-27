import express from "express";
import { authMiddleware } from "../../middleware/auth.middleware.js";
import { verifyBusinessOwnership } from "../../middleware/ownership.middleware.js";
import {
  checkSubscription,
  requireActiveSubscription
} from "../../middleware/subscription.middleware.js";

import {
  createSaleController,
  addSaleItemController,
  addSalePaymentController,
  getSaleDetailsController
} from "./sales.controller.js";

import { getDebtorsController, getCustomerDebtsController } from "../debtors/debtors.controller.js";

const router = express.Router({ mergeParams: true });

router.use(authMiddleware);
router.use(verifyBusinessOwnership);
router.use(checkSubscription);

// WRITE routes
router.post("/", requireActiveSubscription, createSaleController);
router.post("/:id/items", requireActiveSubscription, addSaleItemController);
router.post("/:id/payments", requireActiveSubscription, addSalePaymentController);

// READ route
router.get("/debtors", getDebtorsController);
router.get("/debtors/:customerId", getCustomerDebtsController);
router.get("/:id", getSaleDetailsController);

export default router;