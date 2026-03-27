import pool from "../config/db.js";


export const checkSubscription = async (req, res, next) => {
  try {
    const businessId = req.params.businessId;

    const result = await pool.query(
      `
      SELECT status, end_date
      FROM subscriptions
      WHERE business_id = $1
      ORDER BY created_at DESC
      LIMIT 1
      `,
      [businessId]
    );

   if (result.rowCount === 0) {
  req.subscription = {
    isActive: false,
    status: "none"
  };
  return next();
   }

    const subscription = result.rows[0];

    const isActive =
    ["active", "trial"].includes(subscription.status) &&
    new Date(subscription.end_date) > new Date();

    const daysLeft = Math.ceil(
  (new Date(subscription.end_date) - new Date()) / (1000 * 60 * 60 * 24)
  );


    // Attach subscription state to request
    req.subscription = {
      isActive,
      status: subscription.status,
      daysLeft: daysLeft > 0 ? daysLeft : 0
    };

    next();
  } catch (error) {
    next(error);
  }
};

export const requireActiveSubscription = (req, res, next) => {
  if (!req.subscription?.isActive) {
    return res.status(403).json({
      message: "Subscription expired. Renew to perform this action."
    });
  }

  next();
};