import pool from "../../config/db.js";

export const getDebtors = async (businessId, userId) => {
  const result = await pool.query(
    `
    SELECT 
      c.id,
      c.name,
      c.phone,
      SUM(s.balance) AS total_debt,
      COUNT(s.id) AS total_sales
    FROM customers c
    JOIN sales s ON s.customer_id = c.id
    JOIN businesses b ON c.business_id = b.id
    WHERE c.business_id = $1
    AND b.user_id = $2
    AND s.balance > 0
    GROUP BY c.id, c.name, c.phone
    ORDER BY total_debt DESC
    `,
    [businessId, userId]
  );

  return result.rows;
};

export const getCustomerDebts = async (businessId, customerId, userId) => {
  const result = await pool.query(
    `
    SELECT 
      s.id AS sale_id,
      s.total_amount,
      s.amount_paid,
      s.balance,
      s.created_at,
      c.name AS customer_name
    FROM sales s
    JOIN customers c ON s.customer_id = c.id   -- ✅ FIX
    JOIN businesses b ON s.business_id = b.id
    WHERE s.business_id = $1
    AND s.customer_id = $2
    AND b.user_id = $3
    AND s.balance > 0
    ORDER BY s.created_at DESC
    `,
    [businessId, customerId, userId]
  );

  return result.rows;
};