import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import { cartSessionOptions, parseSessionCart } from "@/lib/cart-session";
import type { CartSessionData } from "@/lib/cart-session";

export async function GET() {
  const cookieStore = await cookies();
  const session = await getIronSession<CartSessionData>(cookieStore, cartSessionOptions);
  return Response.json({ cart: parseSessionCart(session.cart) });
}
