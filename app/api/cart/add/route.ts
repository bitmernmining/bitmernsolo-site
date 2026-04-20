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

  const existing = cart.find((e) => e.productId === productId);
  const rawQty = (existing?.quantity ?? 0) + quantity;
  const clampedQty = Math.min(rawQty, stockCount);
  const clamped = clampedQty < rawQty;

  let updatedCart: CartEntry[];
  if (existing) {
    updatedCart = cart.map((e) =>
      e.productId === productId ? { ...e, quantity: clampedQty } : e
    );
  } else {
    updatedCart = [...cart, { productId, quantity: clampedQty }];
  }

  session.cart = updatedCart;
  await session.save();

  return Response.json({
    success: true,
    cart: updatedCart,
    clamped,
    clampedTo: clamped ? clampedQty : null,
  });
}
