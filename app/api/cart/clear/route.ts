import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import { cartSessionOptions } from "@/lib/cart-session";
import type { CartSessionData } from "@/lib/cart-session";

export async function POST() {
  const cookieStore = await cookies();
  const session = await getIronSession<CartSessionData>(cookieStore, cartSessionOptions);
  session.cart = [];
  await session.save();
  return Response.json({ success: true, cart: [] });
}
