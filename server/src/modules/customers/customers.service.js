import pool from "../../config/db.js";
import { AppError } from "../../utils/AppError.js";

/**
 * Create Customer
 */
export const createCustomer = async (
  businessId,
  name,
  phone,
  address,
  userId
) => {
  const result = await pool.query(
    `
    INSERT INTO customers (business_id, name, phone, address)
    SELECT $1, $2, $3, $4
    FROM businesses
    WHERE id = $1
    AND user_id = $5
    RETURNING *
    `,
    [businessId, name, phone, address, userId]
  );

  if (result.rowCount === 0) {
    throw new AppError("Unauthorized business access", 403);
  }

  return result.rows[0];
};


/**
 * Get Customers (Active Only)
 */
export const getCustomersByBusiness = async (businessId, userId) => {
  const result = await pool.query(
    `
    SELECT c.*
    FROM customers c
    JOIN businesses b ON c.business_id = b.id
    WHERE c.business_id = $1
    AND b.user_id = $2
    AND c.is_active = TRUE
    ORDER BY c.created_at DESC
    `,
    [businessId, userId]
  );

  return result.rows;
};


/**
 * Update Customer
 */
export const updateCustomer = async (
  customerId,
  name,
  phone,
  address,
  userId
) => {
  const result = await pool.query(
    `
    UPDATE customers c
    SET name = $1,
        phone = $2,
        address = $3
    FROM businesses b
    WHERE c.id = $4
    AND c.business_id = b.id
    AND b.user_id = $5
    AND c.is_active = TRUE
    RETURNING c.*
    `,
    [name, phone, address, customerId, userId]
  );

  if (result.rowCount === 0) {
    throw new AppError("Unauthorized or customer not found", 404);
  }

  return result.rows[0];
};


/**
 * Soft Delete Customer
 */
export const deleteCustomer = async (customerId, userId) => {
  const result = await pool.query(
    `
    UPDATE customers c
    SET is_active = FALSE
    FROM businesses b
    WHERE c.id = $1
    AND c.business_id = b.id
    AND b.user_id = $2
    AND c.is_active = TRUE
    RETURNING c.*
    `,
    [customerId, userId]
  );

  if (result.rowCount === 0) {
    throw new AppError("Unauthorized or customer not found", 404);
  }

  return result.rows[0];
};