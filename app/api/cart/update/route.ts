import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import { cartSessionOptions, parseSessionCart } from "@/lib/cart-session";
import type { CartSessionData, CartEntry } from "@/lib/cart-session";

export async function POST(request: Request) {
  let body: { productId?: string; quantity?: number; stockCount?: number };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { productId, quantity, stockCount } = body;
  if (!productId || typeof quantity !== "number" || typeof stockCount !== "number") {
    return Response.json(
      { error: "productId, quantity, and stockCount are required" },
      { status: 400 }
    );
  }

  const cookieStore = await cookies();
  const session = await getIronSession<CartSessionData>(cookieStore, cartSessionOptions);
  const cart = parseSessionCart(session.cart);

  let updatedCart: CartEntry[];
  let clamped = false;
  let clampedTo: number | null = null;

  if (quantity <= 0) {
    // Remove entry when quantity is set to 0 or below
    updatedCart = cart.filter((e) => e.productId !== productId);
  } else {
    const clampedQty = Math.min(quantity, stockCount);
    clamped = clampedQty < quantity;
    clampedTo = clamped ? clampedQty : null;
    updatedCart = cart.map((e) =>
      e.productId === productId ? { ...e, quantity: clampedQty } : e
    );
  }

  session.cart = updatedCart;
  await session.save();

  return Response.json({ success: true, cart: updatedCart, clamped, clampedTo });
}
