import { z } from "zod";

export const createProductSchema = z.object({
  body: z.object({
    name: z.string().min(2, "Product name must be at least 2 characters"),
    price: z.coerce.number().positive("Price must be positive"),
    quantity: z.coerce.number().int().min(0, "Quantity cannot be negative")
  }),
  params: z.object({
    businessId: z.coerce.number()
  }), 
  query: z.object({}).optional()
});