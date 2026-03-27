import pool from "../../config/db.js";

export const getDashboardSummary = async (businessId, userId) => {


  const [
    todaySales,
    todayRevenue,
    unpaidBalance,
    outstandingBalance,
    totalProducts,
    lowStockProducts,
    topProducts
  ] = await Promise.all([

    pool.query(
      `SELECT COUNT(*) AS total_sales,
              COALESCE(SUM(total_amount),0) AS total_sales_value
       FROM sales
       WHERE business_id = $1
         AND created_at >= CURRENT_DATE
         AND created_at < CURRENT_DATE + INTERVAL '1 day'`,
      [businessId]
    ),

    pool.query(
      `SELECT COALESCE(SUM(sp.amount),0) AS total_revenue
       FROM sale_payments sp
       JOIN sales s ON sp.sale_id = s.id
       WHERE s.business_id = $1
       AND sp.paid_at >= CURRENT_DATE
       AND sp.paid_at < CURRENT_DATE + INTERVAL '1 day'`,
      [businessId]
    ),

  
    pool.query(
      `SELECT COALESCE(SUM(balance),0) AS total_balance
       FROM sales
       WHERE business_id = $1
        AND created_at >= CURRENT_DATE
        AND created_at < CURRENT_DATE + INTERVAL '1 day'`,
      [businessId]
    ),

    pool.query(
`
SELECT COALESCE(SUM(balance),0) AS outstanding_balance
FROM sales
WHERE business_id = $1
AND balance > 0
`,
[businessId]
),

    pool.query(
      `SELECT COUNT(*) AS total_products
       FROM products
       WHERE business_id = $1`,
      [businessId]
    ),

    pool.query(
      `SELECT COUNT(*) AS low_stock_products
       FROM products
       WHERE business_id = $1
       AND quantity <= 5`,
      [businessId]
    ),

     pool.query(
`
SELECT
p.name AS product_name,
SUM(si.quantity) AS quantity_sold,
SUM(si.subtotal) AS revenue
FROM sale_items si
JOIN products p ON si.product_id = p.id
JOIN sales s ON si.sale_id = s.id
WHERE s.business_id = $1
AND DATE(s.created_at) = CURRENT_DATE
GROUP BY p.name
ORDER BY quantity_sold DESC
LIMIT 5
`,
[businessId]
)
  ]);

  return {
    today_sales: Number(todaySales.rows[0].total_sales),
    today_revenue: Number(todayRevenue.rows[0].total_revenue),
    total_balance: Number(unpaidBalance.rows[0].total_balance),
    outstanding_balance: Number(outstandingBalance.rows[0].outstanding_balance),
    total_products: Number(totalProducts.rows[0].total_products),
    low_stock_products: Number(lowStockProducts.rows[0].low_stock_products),
    top_products_today: topProducts.rows
  };
};