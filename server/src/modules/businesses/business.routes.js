import express from "express";
import { authMiddleware } from "../../middleware/auth.middleware.js";
import { getUserBusinessesController, createBusinessController, deleteBusinessController } from "./business.controller.js";

const router = express.Router();

router.get("/", authMiddleware, getUserBusinessesController);
router.post("/", authMiddleware, createBusinessController);

router.delete("/:id",authMiddleware, deleteBusinessController);

export default router;