"use client";

import Link from "next/link";
import Image from "next/image";
import { useCartContext } from "@/contexts/cart-context";
import { formatPriceCents, formatHashrate } from "@/lib/format";
import { Button } from "@/components/ui/button";
import {
  ShoppingCart,
  ChevronLeft,
  Minus,
  Plus,
  Trash2,
  Box,
  ShieldCheck,
  Truck,
  ExternalLink,
} from "lucide-react";

function EmptyCart(): React.ReactNode {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-24">
      <div className="rounded-full bg-muted/30 p-5">
        <ShoppingCart className="h-10 w-10 text-muted-foreground/30" />
      </div>
      <h2 className="font-heading text-xl font-semibold">Your cart is empty</h2>
      <p className="text-sm text-muted-foreground max-w-xs text-center">
        Browse our selection of solo mining hardware to get started.
      </p>
      <Link href="/shop">
        <Button className="gap-2">Browse Miners</Button>
      </Link>
    </div>
  );
}

function buildCheckoutUrl(items: ReturnType<typeof useCartContext>["items"]): string {
  try {
    const entries = items.map((i) => ({ productId: i.productId, quantity: i.quantity }));
    const encoded = btoa(JSON.stringify(entries));
    return `https://app.bitmernsolo.com/shop/cart/import?cart=${encoded}`;
  } catch {
    return "https://app.bitmernsolo.com/shop/checkout";
  }
}

export default function CartPage(): React.ReactNode {
  const { items, itemCount, subtotalCents, updateQuantity, removeFromCart } =
    useCartContext();

  if (items.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
        <Link
          href="/shop"
          className="flex items-center gap-1 hover:text-foreground transition-colors"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
          Shop Miners
        </Link>
        <span className="text-muted-foreground/40">/</span>
        <span className="text-foreground font-medium">Cart</span>
      </nav>

      <div>
        <h1 className="font-heading text-2xl font-semibold tracking-tight">
          Shopping Cart
        </h1>
        <p className="mt-0.5 text-sm text-muted-foreground">
          {itemCount} {itemCount === 1 ? "item" : "items"}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_380px] items-start">
        {/* Cart items */}
        <div className="space-y-3">
          {items.map((item) => {
            const unitPrice =
              item.product.sale_price_cents ?? item.product.price_cents;
            const lineTotal = unitPrice * item.quantity;
            const hasImage = item.product.images.length > 0;

            return (
              <div
                key={item.productId}
                className="flex gap-4 rounded-xl border border-border/20 bg-card/50 p-4"
              >
                {/* Product image */}
                <Link
                  href={`/shop/${item.product.slug}`}
                  className="relative h-24 w-24 shrink-0 rounded-lg bg-background/50 border border-border/10 overflow-hidden"
                >
                  {hasImage ? (
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      sizes="96px"
                      className="object-contain p-2"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <Box className="h-8 w-8 text-muted-foreground/20" />
                    </div>
                  )}
                </Link>

                {/* Product details */}
                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <Link
                        href={`/shop/${item.product.slug}`}
                        className="font-heading text-sm font-semibold hover:text-primary transition-colors"
                      >
                        {item.product.name}
                      </Link>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {item.product.brand} &middot;{" "}
                        {formatHashrate(item.product.hashrate)}
                      </p>
                    </div>
                    <span className="text-sm font-bold font-heading shrink-0">
                      {formatPriceCents(lineTotal)}
                    </span>
                  </div>

                  {/* Bottom row: quantity + remove */}
                  <div className="mt-auto flex items-center justify-between pt-3">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center rounded-lg border border-border/30 overflow-hidden">
                        <button
                          onClick={() =>
                            updateQuantity(item.productId, item.quantity - 1)
                          }
                          className="flex h-8 w-8 items-center justify-center hover:bg-muted/50 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-8 text-center text-sm font-mono font-medium border-x border-border/30">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.productId, item.quantity + 1)
                          }
                          disabled={item.quantity >= item.product.stock_count}
                          className="flex h-8 w-8 items-center justify-center hover:bg-muted/50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      {item.quantity >= item.product.stock_count && (
                        <span className="text-[11px] text-yellow-400">Max stock</span>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-muted-foreground">
                        {formatPriceCents(unitPrice)} each
                      </span>
                      <button
                        onClick={() => removeFromCart(item.productId)}
                        className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Order summary — sticky */}
        <div className="lg:sticky lg:top-6 space-y-4">
          <div className="rounded-xl border border-border/20 bg-card/50 p-5 space-y-4">
            <h3 className="font-heading text-base font-semibold">
              Order Summary
            </h3>

            <div className="space-y-2.5 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  Subtotal ({itemCount} {itemCount === 1 ? "item" : "items"})
                </span>
                <span className="font-medium">
                  {formatPriceCents(subtotalCents)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span className="text-green-400">Free</span>
              </div>
              <div className="border-t border-border/20 pt-2.5">
                <div className="flex justify-between text-base font-bold">
                  <span>Estimated Total</span>
                  <span className="font-heading">
                    {formatPriceCents(subtotalCents)}
                  </span>
                </div>
              </div>
            </div>

            <a href={buildCheckoutUrl(items)} className="block">
              <Button className="w-full gap-2 h-11">
                Proceed to Checkout
                <ExternalLink className="h-4 w-4" />
              </Button>
            </a>
            <p className="text-[10px] text-muted-foreground/50 text-center">
              You&apos;ll be redirected to complete your purchase
            </p>

            <Link href="/shop" className="block">
              <Button variant="ghost" className="w-full gap-2 text-xs h-9">
                <ChevronLeft className="h-3.5 w-3.5" />
                Continue Shopping
              </Button>
            </Link>
          </div>

          {/* Trust signals */}
          <div className="rounded-xl border border-border/10 bg-card/30 p-4 space-y-3">
            <div className="flex items-center gap-2.5 text-xs text-muted-foreground">
              <ShieldCheck className="h-4 w-4 text-green-400/70 shrink-0" />
              <span>Secure crypto checkout via Coinbase Commerce</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-muted-foreground">
              <Truck className="h-4 w-4 text-primary/70 shrink-0" />
              <span>Ships within 3-5 business days</span>
            </div>
            <p className="text-[10px] text-muted-foreground/40 leading-relaxed">
              To fully support the crypto ecosystem, we only accept crypto payments at this time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
