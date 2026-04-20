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

// NEW: Session cart entry (productId + quantity only — NOT the DB row shape)
// WARNING: Do not confuse with CartItemSchema above which is the Supabase DB row shape
export const CartEntrySchema = z.object({
  productId: z.string(),
  quantity: z.number().int().min(1),
});

export const CartSchema = z.array(CartEntrySchema);

export type CartEntry = z.infer<typeof CartEntrySchema>;
