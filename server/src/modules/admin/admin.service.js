// modules/admin/admin.service.js
import pool from "../../config/db.js";


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
      throw new Error("Payment not found");
    }

    // ❗ 2. Prevent double approval
    if (payment.status === "approved") {
      throw new Error("Payment already approved");
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

    // ❗ 4. Check existing subscription
    const subRes = await client.query(
      `
      SELECT id FROM subscriptions
      WHERE business_id = $1
      ORDER BY created_at DESC
      LIMIT 1
      `,
      [payment.business_id]
    );

    if (subRes.rows.length > 0) {
      // ✅ UPDATE existing subscription
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
      // ✅ CREATE new subscription
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
    }

    await client.query("COMMIT");

    return { message: "Payment approved & subscription activated" };

  } catch (err) {
    await client.query("ROLLBACK");
    console.error("APPROVE ERROR:", err.message);
    throw err;
  } finally {
    client.release();
  }
};