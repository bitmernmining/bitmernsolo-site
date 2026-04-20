import { CartSchema } from "@/lib/schemas/cart";
import type { CartEntry } from "@/lib/schemas/cart";

export type { CartEntry };

export interface CartSessionData {
  cart?: unknown; // Stored as unknown — always validate via parseSessionCart before use
}

export const cartSessionOptions = {
  cookieName: "bitmern-cart-session",
  password: process.env.CART_SESSION_SECRET as string,
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    maxAge: 60 * 60 * 24 * 7, // 7 days
  },
};

/**
 * Validates raw session cart data against CartSchema.
 * Returns empty array on any validation failure — never throws.
 * Per project convention: safeParse everywhere, console.warn on failure.
 */
export function parseSessionCart(raw: unknown): CartEntry[] {
  const result = CartSchema.safeParse(raw);
  if (!result.success) {
    if (raw !== undefined) {
      console.warn("[cart-session] Malformed cart data discarded", raw);
    }
    return [];
  }
  return result.data;
}
