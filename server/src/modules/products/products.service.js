import pool from "../../config/db.js";

/**
 * Create product
 */
export const createProduct = async (
  businessId,
  name,
  price,
  quantity,
  userId
) => {

  const result = await pool.query(
    `
    INSERT INTO products (business_id, name, price, quantity)
    SELECT $1,$2,$3,$4
    FROM businesses
    WHERE id = $1
    AND user_id = $5
    RETURNING *
    `,
    [businessId, name, price, quantity, userId]
  );

  if (result.rowCount === 0) {
    throw new Error("Unauthorized business access");
  }

  return result.rows[0];
};

export const getProductsByBusiness = async (
  businessId,
  userId,
  page = 1,
  limit = 10,
  search = ""
) => {

  const offset = (page - 1) * limit;

  const products = await pool.query(
    `
    SELECT p.*
    FROM products p
    JOIN businesses b ON p.business_id = b.id
    WHERE b.id = $1
    AND b.user_id = $2
    AND p.name ILIKE $3
    ORDER BY p.created_at DESC
    LIMIT $4
    OFFSET $5
    `,
    [businessId, userId, `%${search}%`, limit, offset]
  );

  const count = await pool.query(
    `
    SELECT COUNT(*)
    FROM products p
    JOIN businesses b ON p.business_id = b.id
    WHERE b.id = $1
    AND b.user_id = $2
    AND p.name ILIKE $3
    `,
    [businessId, userId, `%${search}%`]
  );

  return {
    rows: products.rows,
    total: parseInt(count.rows[0].count)
  };

};

export const updateProduct = async (
  product_id,
  name,
  price,
  quantity,
  userId
) => {

  const result = await pool.query(
    `
    UPDATE products p
    SET name = $1,
        price = $2,
        quantity = $3
    FROM businesses b
    WHERE p.business_id = b.id
    AND p.id = $4
    AND b.user_id = $5
    RETURNING p.*
    `,
    [name, price, quantity, product_id, userId]
  );

  if (result.rowCount === 0) {
    throw new Error("Unauthorized or product not found");
  }

  return result.rows[0];
};

export const deleteProduct = async (product_id, userId) => {

  const result = await pool.query(
    `
    DELETE FROM products p
    USING businesses b
    WHERE p.business_id = b.id
    AND p.id = $1
    AND b.user_id = $2
    RETURNING p.*
    `,
    [product_id, userId]
  );

  if (result.rowCount === 0) {
    throw new Error("Unauthorized or product not found");
  }

  return result.rows[0];
};