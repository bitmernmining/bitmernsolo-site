import { z } from "zod";

const OrderStatusSchema = z.enum(["pending", "paid", "shipped", "delivered", "cancelled", "refunded"]);
const PaymentMethodSchema = z.enum(["coinbase"]);

const ShippingAddressSchema = z.object({
  name: z.string(),
  street: z.string(),
  city: z.string(),
  state: z.string(),
  zip: z.string(),
  country: z.string(),
});

export const OrderSchema = z.object({
  id: z.string(),
  user_id: z.string(),
  status: OrderStatusSchema,
  payment_method: PaymentMethodSchema,
  payment_id: z.string().nullable(),
  coinbase_charge_id: z.string().nullable(),
  coinbase_hosted_url: z.string().nullable(),
  subtotal_cents: z.number(),
  shipping_cents: z.number(),
  tax_cents: z.number(),
  total_cents: z.number(),
  shipping_address: ShippingAddressSchema,
  discount_cents: z.number(),
  discount_code: z.string().nullable(),
  tracking_number: z.string().nullable(),
  notes: z.string().nullable(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const OrderItemSchema = z.object({
  id: z.string(),
  order_id: z.string(),
  product_id: z.string(),
  quantity: z.number(),
  price_cents: z.number(),
  product_name: z.string(),
});

export type OrderStatus = z.infer<typeof OrderStatusSchema>;
export type Order = z.infer<typeof OrderSchema>;
export type OrderItem = z.infer<typeof OrderItemSchema>;
export type OrderWithItems = Order & { items: OrderItem[] };
