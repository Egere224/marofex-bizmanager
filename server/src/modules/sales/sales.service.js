import pool from "../../config/db.js";

/**
 * Create a new sale
 */
export const createSale = async (businessId, customer_id, userId) => {

  const result = await pool.query(
    `
    INSERT INTO sales (business_id, customer_id, total_amount)
    SELECT $1, $2, 0
    FROM businesses
    WHERE id = $1
    AND user_id = $3
    RETURNING *
    `,
    [businessId, customer_id, userId]
  );

  if (result.rowCount === 0) {
    throw new Error("Unauthorized business access");
  }

  return result.rows[0];
};

/**
 * Add item to sale
 * Trigger will auto recalc totals
 */
export const addSaleItem = async (
  sale_id,
  product_id,
  quantity,
  userId
) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // 1️⃣ Lock product row
   const productResult = await client.query(
  `
  SELECT p.quantity
  FROM products p
  JOIN businesses b ON p.business_id = b.id
  WHERE p.id = $1
  AND b.user_id = $2
  FOR UPDATE
  `,
  [product_id, userId]
);

    if (productResult.rows.length === 0) {
      throw new Error("Product not found");
    }

    const currentStock = productResult.rows[0].quantity;

    if (currentStock < quantity) {
      throw new Error("Insufficient stock");
    }

    // Verify sale belongs to user
const saleCheck = await client.query(
  `
  SELECT s.id
  FROM sales s
  JOIN businesses b ON s.business_id = b.id
  WHERE s.id = $1
  AND b.user_id = $2
  FOR UPDATE
  `,
  [sale_id, userId]
);

if (saleCheck.rowCount === 0) {
  throw new Error("Unauthorized sale access");
}

    // 2️⃣ Deduct stock
    await client.query(
      "UPDATE products SET quantity = quantity - $1 WHERE id = $2",
      [quantity, product_id]
    );


   const existingItem = await client.query(
`
SELECT id, quantity
FROM sale_items
WHERE sale_id = $1 AND product_id = $2
`,
[sale_id, product_id]
);


   const priceResult = await client.query(
 `
    SELECT price
    FROM products
    WHERE id = $1
    `,
    [product_id]
   );

    const unit_price = priceResult.rows[0].price;

if (existingItem.rowCount > 0) {

  const currentQuantity = existingItem.rows[0].quantity;
  const newQuantity = currentQuantity + quantity;

  const subtotal = newQuantity * unit_price;

  const updatedItem = await client.query(
  `
  UPDATE sale_items
  SET quantity = $1,
      subtotal = $2
  WHERE sale_id = $3 AND product_id = $4
  RETURNING *
  `,
  [newQuantity, subtotal, sale_id, product_id]
  );

  await client.query("COMMIT");

  return updatedItem.rows[0];
}

    const subtotal = quantity * unit_price;

    // 3️⃣ Insert sale item
    const saleItem = await client.query(
      `INSERT INTO sale_items
       (sale_id, product_id, quantity, unit_price, subtotal)
       VALUES ($1,$2,$3,$4,$5)
       RETURNING *`,
      [sale_id, product_id, quantity, unit_price, subtotal]
    );
   

    await client.query(
`
UPDATE sales
SET total_amount = (
    SELECT COALESCE(SUM(subtotal),0)
    FROM sale_items
    WHERE sale_id = $1
)
WHERE id = $1
`,
[sale_id]
);
    await client.query("COMMIT");

    return saleItem.rows[0];

  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};


/**
 * Pay for a sale (partial or full)
 * Your DB trigger updates balance + payment_status
 */
export const addSalePayment = async (
  sale_id,
  amount,
  payment_method,
  note,
  userId
) => {
 const result = await pool.query(
  `
  INSERT INTO sale_payments (sale_id, amount, payment_method, note)
  SELECT $1,$2,$3,$4
  FROM sales s
  JOIN businesses b ON s.business_id = b.id
  WHERE s.id = $1
  AND b.user_id = $5
  RETURNING *
  `,
  [sale_id, amount, payment_method, note, userId]
);

if (result.rowCount === 0) {
  throw new Error("Unauthorized sale access");
}

  return result.rows[0];
};

/**
 * Get sale with items
 */
export const getSaleDetails = async (sale_id, userId) => {
 const sale = await pool.query(
  `
  SELECT s.*
  FROM sales s
  JOIN businesses b ON s.business_id = b.id
  WHERE s.id = $1
  AND b.user_id = $2
  `,
  [sale_id, userId]
);

if (sale.rowCount === 0) {
  throw new Error("Unauthorized or sale not found");
}

  const items = await pool.query(
    `SELECT si.*, p.name
     FROM sale_items si
     JOIN products p ON p.id = si.product_id
     WHERE si.sale_id=$1`,
    [sale_id]
  );

  return {
    sale: sale.rows[0],
    items: items.rows
  };
};