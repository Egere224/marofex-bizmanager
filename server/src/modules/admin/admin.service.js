// modules/admin/admin.service.js
import pool from "../../config/db.js";


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

  return result.rows;
};

export const approvePaymentService = async (paymentId, adminId) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // get payment
    const paymentRes = await client.query(
      "SELECT * FROM payment_requests WHERE id = $1",
      [paymentId]
    );

    const payment = paymentRes.rows[0];

    if (!payment) {
      throw new Error("Payment not found");
    }

    // update payment
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

    // create subscription
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
      VALUES ($1, 'active', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP + INTERVAL '30 days', 'monthly', 1)
      `,
      [payment.business_id]
    );

    await client.query("COMMIT");

    return { message: "Payment approved successfully" };

  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
};