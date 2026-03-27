import express from "express";
import { authMiddleware } from "../../middleware/auth.middleware.js";
import { verifyBusinessOwnership } from "../../middleware/ownership.middleware.js";
import { checkSubscription } from "../../middleware/subscription.middleware.js";

import { getDashboardController } from "./dashboard.controller.js";

const router = express.Router({ mergeParams: true });

router.use(authMiddleware);
router.use(verifyBusinessOwnership);
router.use(checkSubscription);

router.get("/", getDashboardController);

export default router;