import { z } from "zod";
import { ProductSchema } from "./product";

export const CartItemSchema = z.object({
  id: z.string(),
  user_id: z.string(),
  product_id: z.string(),
  quantity: z.number(),
  created_at: z.string(),
  product: ProductSchema.optional(),
});

export type CartItem = z.infer<typeof CartItemSchema>;
