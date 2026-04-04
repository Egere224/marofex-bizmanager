import pool from "../config/db.js";

export const checkSubscription = async (req, res, next) => {
  try {
    const businessId = req.params.id || req.params.businessId;

    const result = await pool.query(
      `
      SELECT status, end_date
FROM subscriptions
WHERE business_id = $1
AND status IN ('active', 'trial')
AND end_date IS NOT NULL
AND end_date > NOW()
ORDER BY created_at DESC
LIMIT 1
      `,
      [businessId]
    );

    // 🔹 If no subscription exists
    if (result.rowCount === 0) {
      req.subscription = {
        isActive: false,
        status: "none",
        daysLeft: 0,
      };
      return next();
    }

    const subscription = result.rows[0];

    const now = new Date();

    // ✅ FIX 1: Handle null end_date safely
    const isActive =
      ["active", "trial"].includes(subscription.status) &&
      subscription.end_date &&
      new Date(subscription.end_date) > now;

    // ✅ FIX 2: Safe daysLeft calculation
    let daysLeft = 0;

    if (subscription.end_date) {
      daysLeft = Math.ceil(
        (new Date(subscription.end_date) - now) / (1000 * 60 * 60 * 24)
      );
    }

    // Attach subscription state to request
    req.subscription = {
      isActive,
      status: subscription.status,
      daysLeft: daysLeft > 0 ? daysLeft : 0,
    };

    next();
  } catch (error) {
    next(error);
  }
};

export const requireActiveSubscription = (req, res, next) => {
  if (!req.subscription?.isActive) {
    return res.status(403).json({
      message: "Subscription expired. Renew to perform this action.",
    });
  }

  next();
};