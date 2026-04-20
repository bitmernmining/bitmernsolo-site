import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import { cartSessionOptions, parseSessionCart } from "@/lib/cart-session";
import type { CartSessionData } from "@/lib/cart-session";

export async function GET() {
  const cookieStore = await cookies();
  const session = await getIronSession<CartSessionData>(cookieStore, cartSessionOptions);
  const cart = parseSessionCart(session.cart);

  // Preserve cross-app contract: only productId + quantity in encoded payload
  const entries = cart.map(({ productId, quantity }) => ({ productId, quantity }));

  // Use Buffer (Node.js) instead of btoa (browser) — identical output for ASCII JSON
  const encoded = Buffer.from(JSON.stringify(entries)).toString("base64");
  const url = `https://app.bitmernsolo.com/shop/cart/import?cart=${encoded}`;

  return Response.json({ url });
}
