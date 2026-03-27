import express from "express";
import { authMiddleware } from "../../middleware/auth.middleware.js";
import { verifyBusinessOwnership } from "../../middleware/ownership.middleware.js";
import { checkSubscription, requireActiveSubscription } from "../../middleware/subscription.middleware.js";
import { validate } from "../../middleware/validate.middleware.js";
import { createProductSchema } from "./products.schema.js";
import {
  createProductController,
  getProductsController,
  updateProductController,
  deleteProductController
} from "./products.controller.js";

const router = express.Router({ mergeParams: true });

router.use(authMiddleware);
router.use(verifyBusinessOwnership);
router.use(checkSubscription);

router.post(
  "/",
  requireActiveSubscription,
  validate(createProductSchema),
  createProductController
);

router.get("/", getProductsController);

router.put("/:id", requireActiveSubscription, updateProductController);

router.delete("/:id", requireActiveSubscription, deleteProductController);

export default router;
