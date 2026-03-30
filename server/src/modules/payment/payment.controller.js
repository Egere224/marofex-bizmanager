import pool from "../../config/db.js";

export const createPaymentRequest = async (req, res) => {
  try {
    const { amount, business_id } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Receipt is required" });
    }

    const proof_url = req.file.filename;

    const result = await pool.query(
      `INSERT INTO payment_requests (user_id, business_id, amount, proof_url)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [req.user.id, business_id, amount, proof_url]
    );

    res.json({
      success: true,
      data: result.rows[0],
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};