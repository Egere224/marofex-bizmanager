import {
  createSale,
  addSaleItem,
  addSalePayment,
  getSaleDetails
} from "./sales.service.js";

import { asyncHandler } from "../../utils/asyncHandler.js";
import { sendSuccess } from "../../utils/response.js";

/**
 * Create empty sale
 */
export const createSaleController = asyncHandler(async (req, res) => {
  const businessId = req.params.businessId;
  const { customer_id } = req.body;
  const userId = req.user.id;

  const sale = await createSale(
    businessId,
    customer_id,
    userId
  );

  sendSuccess(res, sale, "Sale created successfully", 201);
});
/**
 * Add product to sale
 */
export const addSaleItemController = asyncHandler(async (req, res) => {
  const sale_id = req.params.id
  const { product_id, quantity, } = req.body;
  const userId = req.user.id;

  const item = await addSaleItem(
    sale_id,
    product_id,
    quantity,
    userId
  );

  sendSuccess(res, item, "Item added to sale", 201);
});

/**
 * Add payment to sale (for debt settlement)
 */
export const addSalePaymentController = asyncHandler(async (req, res) => {
  const sale_id = req.params.id
  const { amount, payment_method, note } = req.body;
  const userId = req.user.id;

  const payment = await addSalePayment(
    sale_id,
    amount,
    payment_method,
    note,
    userId
  );

  sendSuccess(res, payment, "Payment added successfully", 201);
});

/**
 * Get sale details
 */
export const getSaleDetailsController = asyncHandler(async (req, res) => {
  const saleId = req.params.id;
  const userId = req.user.id;

  const sale = await getSaleDetails(saleId, userId);

  sendSuccess(res, sale, "Sale details fetched successfully");
});