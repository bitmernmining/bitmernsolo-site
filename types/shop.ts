// Supabase-backed types now derived from Zod schemas.
// Import paths across the codebase are preserved.
export type {
  ProductStatus,
  Product,
} from "@/lib/schemas/product";

export type {
  CartItem,
} from "@/lib/schemas/cart";

export type {
  OrderStatus,
  Order,
  OrderItem,
  OrderWithItems,
} from "@/lib/schemas/order";

// Non-Supabase types remain as interface definitions here.
export type PaymentMethod = "coinbase";

export interface ShippingAddress {
  name: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
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
