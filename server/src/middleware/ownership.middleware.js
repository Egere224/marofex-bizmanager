import pool from "../config/db.js";
import { AppError } from "../utils/AppError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const verifyBusinessOwnership = asyncHandler(
  async (req, res, next) => {
    const businessId = req.params.businessId;
    const userId = req.user.id;

    const result = await pool.query(
      `
      SELECT id
      FROM businesses
      WHERE id = $1
      AND user_id = $2
      `,
      [businessId, userId]
    );

    if (result.rowCount === 0) {
      throw new AppError("Unauthorized business access", 403);
    }

    req.businessId = businessId
    next();
  }
);