import {
  createProduct,
  getProductsByBusiness,
  updateProduct,
  deleteProduct
} from "./products.service.js";

import { asyncHandler } from "../../utils/asyncHandler.js";
import { sendSuccess } from "../../utils/response.js";

/**
 * Create product
 */
export const createProductController = asyncHandler(async (req, res) => {
  const businessId = req.params.businessId;
  const { name, price, quantity } = req.body;
  const userId = req.user.id;

  const product = await createProduct(
    businessId,
    name,
    price,
    quantity,
    userId
  );

  console.log("BODY:", req.body);
  console.log("USER:", req.user);

  sendSuccess(res, product, "Product created successfully", 201);
});

/**
 * Get products
 */
export const getProductsController = asyncHandler(async (req, res) => {

  const businessId = req.params.businessId;
  const userId = req.user.id;

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search || "";

  const result = await getProductsByBusiness(
    businessId,
    userId,
    page,
    limit,
    search
  );

  sendSuccess(res, {
    products: result.rows,
    currentPage: page,
    totalPages: Math.ceil(result.total / limit)
  }, "Products fetched successfully");

});
/**
 * Update product
 */
export const updateProductController = asyncHandler(async (req, res) => {
  const { name, price, quantity } = req.body;
  const productId = req.params.id;
  const userId = req.user.id;

  const product = await updateProduct(
    productId,
    name,
    price,
    quantity,
    userId
  );

  sendSuccess(res, product, "Product updated successfully");
});

/**
 * Delete product
 */
export const deleteProductController = asyncHandler(async (req, res) => {
  const productId = req.params.id;
  const userId = req.user.id;

  const product = await deleteProduct(productId, userId);

  sendSuccess(res, product, "Product deleted successfully");
});