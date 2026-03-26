import type { CoinSymbol } from "@/types/coin";

export type ProductStatus = "active" | "draft" | "out_of_stock";
export type OrderStatus = "pending" | "paid" | "shipped" | "delivered" | "cancelled" | "refunded";
export type PaymentMethod = "coinbase";

export interface ProductSpecs {
  weight_kg?: number;
  dimensions?: string;
  noise_db?: number;
  voltage?: string;
  cooling?: string;
  interface?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  short_desc: string;
  brand: string;
  algorithm: string;
  coin_compatible: CoinSymbol[];
  hashrate: number;
  hashrate_unit: string;
  power_watts: number;
  price_cents: number;
  sale_price_cents: number | null;
  stripe_price_id: string | null;
  images: string[];
  specs: ProductSpecs;
  stock_count: number;
  status: ProductStatus;
  featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface CartItem {
  id: string;
  user_id: string;
  product_id: string;
  quantity: number;
  created_at: string;
  product?: Product;
}

export interface ShippingAddress {
  name: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export interface Order {
  id: string;
  user_id: string;
  status: OrderStatus;
  payment_method: PaymentMethod;
  payment_id: string | null;
  coinbase_charge_id: string | null;
  coinbase_hosted_url: string | null;
  subtotal_cents: number;
  shipping_cents: number;
  tax_cents: number;
  total_cents: number;
  shipping_address: ShippingAddress;
  discount_cents: number;
  discount_code: string | null;
  tracking_number: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  price_cents: number;
  product_name: string;
}

export interface OrderWithItems extends Order {
  items: OrderItem[];
}

export type SupportTicketStatus = "open" | "in_progress" | "resolved" | "closed";

export interface SupportTicket {
  id: string;
  user_id: string;
  ticket_number: string;
  order_id: string | null;
  category: string;
  subject: string;
  message: string;
  email: string;
  status: SupportTicketStatus;
  admin_notes: string | null;
  created_at: string;
  updated_at: string;
}

export type DiscountType = "fixed" | "percent";

export interface Coupon {
  id: string;
  code: string;
  description: string | null;
  discount_type: DiscountType;
  discount_value: number;
  max_uses: number | null;
  current_uses: number;
  max_uses_per_user: number | null;
  min_cart_cents: number;
  max_discount_cents: number | null;
  valid_from: string;
  valid_until: string | null;
  free_shipping: boolean;
  active: boolean;
  created_at: string;
  updated_at: string;
}
