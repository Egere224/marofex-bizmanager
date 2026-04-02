// modules/admin/admin.service.js
import pool from "../../config/db.js";
import { AppError } from "../../utils/AppError.js";

/*
----------------------------------------
APPROVE PAYMENT SERVICE
----------------------------------------
*/
export const approvePaymentService = async (paymentId, adminId) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // 1. Get payment
    const paymentRes = await client.query(
      "SELECT * FROM payment_requests WHERE id = $1",
      [paymentId]
    );

    const payment = paymentRes.rows[0];

    if (!payment) {
      throw new AppError("Payment not found", 404);
    }

    // 2. Prevent double approval
    if (payment.status === "approved") {
      throw new AppError("Payment already approved", 400);
    }

    // 3. Update payment
    await client.query(
      `
      UPDATE payment_requests
      SET status = 'approved',
          approved_at = CURRENT_TIMESTAMP,
          approved_by = $1
      WHERE id = $2
      `,
      [adminId, paymentId]
    );

    // 4. Check existing subscription
    const subRes = await client.query(
      `
      SELECT 1 FROM subscriptions
      WHERE business_id = $1
      LIMIT 1
      `,
      [payment.business_id]
    );

    if (subRes.rows.length > 0) {
      // UPDATE existing subscription
      await client.query(
        `
        UPDATE subscriptions
        SET status = 'active',
            start_date = CURRENT_TIMESTAMP,
            end_date = CURRENT_TIMESTAMP + INTERVAL '30 days'
        WHERE business_id = $1
        `,
        [payment.business_id]
      );
    } else {
      // CREATE new subscription
      await client.query(
        `
        INSERT INTO subscriptions (
          business_id,
          status,
          start_date,
          end_date,
          plan_type,
          businesses_allowed
        )
        VALUES (
          $1,
          'active',
          CURRENT_TIMESTAMP,
          CURRENT_TIMESTAMP + INTERVAL '30 days',
          'monthly',
          1
        )
        `,
        [payment.business_id]
      );
    }

    await client.query("COMMIT");

    return { message: "Payment approved & subscription activated" };

  } catch (err) {
    await client.query("ROLLBACK");

    console.error("APPROVE ERROR:", err);

    if (err instanceof AppError) {
      throw err;
    }

    throw new AppError("Failed to approve payment", 500);

  } finally {
    client.release();
  }
};


/*
----------------------------------------
GET ALL PAYMENTS
----------------------------------------
*/
export const getAllPaymentsService = async () => {
  const result = await pool.query(`
    SELECT 
      pr.id,
      pr.amount,
      pr.status,
      pr.proof_url,
      pr.requested_at,
      u.full_name,
      u.email,
      b.name AS business_name
    FROM payment_requests pr
    JOIN users u ON pr.user_id = u.id
    JOIN businesses b ON pr.business_id = b.id
    ORDER BY pr.requested_at DESC
  `);

  const BASE_URL = process.env.BASE_URL;

  return result.rows.map((payment) => ({
    ...payment,
    proof_url: `${BASE_URL}/uploads/${payment.proof_url}`,
  }));
};


/*
----------------------------------------
GET ALL USERS (SOFT DELETE SAFE)
----------------------------------------
*/
export const getAllUsersService = async () => {
  const result = await pool.query(`
    SELECT id, full_name, email, phone, created_at
    FROM users
    WHERE is_deleted = false
    ORDER BY created_at DESC
  `);

  return result.rows;
};


/*
----------------------------------------
DELETE USER (SOFT DELETE)
----------------------------------------
*/
export const deleteUserService = async (userId, adminId) => {

  if (userId == adminId) {
    throw new AppError("You cannot delete your own account", 400);
  }

  const result = await pool.query(
    `
    UPDATE users
    SET is_deleted = true
    WHERE id = $1
    RETURNING id, email
    `,
    [userId]
  );

  if (result.rows.length === 0) {
    throw new AppError("User not found", 404);
  }

  return {
    message: "User deleted successfully",
    user: result.rows[0],
  };
};


/*
----------------------------------------
GET ALL BUSINESSES
----------------------------------------
*/
export const getAllBusinessesService = async () => {
  const result = await pool.query(`
    SELECT 
      b.id,
      b.name,
      b.created_at,
      u.full_name AS owner_name,
      u.email AS owner_email
    FROM businesses b
    JOIN users u ON b.user_id = u.id
    ORDER BY b.created_at DESC
  `);

  return result.rows;
};