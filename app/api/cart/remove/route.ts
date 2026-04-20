import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import { cartSessionOptions, parseSessionCart } from "@/lib/cart-session";
import type { CartSessionData } from "@/lib/cart-session";

export async function POST(request: Request) {
  let body: { productId?: string };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { productId } = body;
  if (!productId) {
    return Response.json({ error: "productId is required" }, { status: 400 });
  }

  const cookieStore = await cookies();
  const session = await getIronSession<CartSessionData>(cookieStore, cartSessionOptions);
  const cart = parseSessionCart(session.cart);
  const updatedCart = cart.filter((e) => e.productId !== productId);

  session.cart = updatedCart;
  await session.save();

  return Response.json({ success: true, cart: updatedCart });
}
