import express from "express";
import { authMiddleware } from "../../middleware/auth.middleware.js";
import { getUserBusinessesController, getBusinessByIdController, createBusinessController, deleteBusinessController } from "./business.controller.js";
import { checkSubscription } from "../../middleware/subscription.middleware.js";

const router = express.Router();

router.get("/", authMiddleware, getUserBusinessesController);
router.post("/", authMiddleware, createBusinessController);
router.get(
  "/:businessId",
  authMiddleware,
  checkSubscription,   
  getBusinessByIdController
);

router.delete("/:businessId",authMiddleware, deleteBusinessController);

export default router;