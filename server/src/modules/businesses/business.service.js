import pool from "../../config/db.js";

export const getUserBusinesses = async (userId) => {
  const result = await pool.query(
    `
    SELECT 
      b.id,
      b.name,
      b.currency,
      s.status,
      s.end_date
    FROM businesses b
    LEFT JOIN subscriptions s 
      ON b.id = s.business_id
    WHERE b.user_id = $1
    ORDER BY b.created_at DESC
    `,
    [userId]
  );

  return result.rows;
};


export const createBusinessService = async (userId, name, currency) => {

  // Check if user has used trial
  const userResult = await pool.query(
    "SELECT trial_used FROM users WHERE id = $1",
    [userId]
  );

  const trialUsed = userResult.rows[0].trial_used;


  // Create business
  const result = await pool.query(
    `
    INSERT INTO businesses (user_id, name, currency)
    VALUES ($1, $2, $3)
    RETURNING id, name, currency
    `,
    [userId, name, currency]
  );

  const business = result.rows[0];


  // If user has not used trial → give trial
  if (!trialUsed) {

    await pool.query(
      `
      INSERT INTO subscriptions 
(business_id, status, start_date, end_date, businesses_allowed, plan_type)
VALUES 
($1, 'trial', NOW(), NOW() + INTERVAL '14 days', 1, 'trial')
      `,
      [business.id]
    );

    // mark trial used
    await pool.query(
      `UPDATE users SET trial_used = TRUE WHERE id = $1`,
      [userId]
    );

  } else {

    // Create expired subscription
    await pool.query(
      `
      INSERT INTO subscriptions (business_id, status, start_date, end_date, businesses_allowed)
      VALUES ($1, 'expired', NOW(), NOW(), 1)
      `,
      [business.id]
    );

  }

  return business;
};

export const getBusinessByIdService = async (businessId, userId) => {
  const result = await pool.query(
    `
    SELECT 
      b.id,
      b.name,
      b.currency,
      s.status,
      s.end_date
    FROM businesses b
    LEFT JOIN subscriptions s 
      ON b.id = s.business_id
    WHERE b.id = $1 AND b.user_id = $2
    LIMIT 1
    `,
    [businessId, userId]
  );

  return result.rows[0];
  
};


export const deleteBusinessService = async (businessId, userId) => {

  const result = await pool.query(
    `
    DELETE FROM businesses
    WHERE id = $1
    AND user_id = $2
    RETURNING id
    `,
    [businessId, userId]
  );

  return result.rows[0];
};