"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import type { Product } from "@/types/shop";
import { useCatalogContext } from "@/contexts/catalog-context";
import { useToast } from "@/components/ui/toast";
import type { CartEntry } from "@/lib/cart-session";

export interface CartItemWithProduct {
  productId: string;
  quantity: number;
  product: Product;
}

export function useCart() {
  const { products } = useCatalogContext();
  const { toast } = useToast();
  const [entries, setEntries] = useState<CartEntry[]>([]);

  // Load initial cart from session on mount
  useEffect(() => {
    fetch("/api/cart")
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((data: { cart: CartEntry[] }) => setEntries(data.cart))
      .catch(() => {});
  }, []);

  const addToCart = useCallback(
    async (productId: string, quantity = 1) => {
      const product = products.find((p) => p.id === productId);
      const stockCount = product?.stock_count ?? 999;
      const res = await fetch("/api/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, quantity, stockCount }),
      });
      if (!res.ok) return;
      const data: { cart: CartEntry[]; clamped: boolean; clampedTo: number | null } =
        await res.json();
      setEntries(data.cart);
      if (data.clamped && data.clampedTo !== null) {
        toast(
          "Stock limit reached",
          `Only ${data.clampedTo} left in stock — quantity adjusted`
        );
      }
    },
    [products, toast]
  );

  const updateQuantity = useCallback(
    async (productId: string, quantity: number) => {
      const product = products.find((p) => p.id === productId);
      const stockCount = product?.stock_count ?? 999;
      const res = await fetch("/api/cart/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, quantity, stockCount }),
      });
      if (!res.ok) return;
      const data: { cart: CartEntry[]; clamped: boolean; clampedTo: number | null } =
        await res.json();
      setEntries(data.cart);
      if (data.clamped && data.clampedTo !== null) {
        toast(
          "Stock limit reached",
          `Only ${data.clampedTo} left in stock — quantity adjusted`
        );
      }
    },
    [products, toast]
  );

  const removeFromCart = useCallback(async (productId: string) => {
    const res = await fetch("/api/cart/remove", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId }),
    });
    if (!res.ok) return;
    const data: { cart: CartEntry[] } = await res.json();
    setEntries(data.cart);
  }, []);

  const clearCart = useCallback(async () => {
    const res = await fetch("/api/cart/clear", { method: "POST" });
    if (!res.ok) return;
    setEntries([]);
  }, []);

  const items: CartItemWithProduct[] = useMemo(() => {
    return entries.reduce<CartItemWithProduct[]>((acc, entry) => {
      const product = products.find((p) => p.id === entry.productId);
      if (product) acc.push({ ...entry, product });
      return acc;
    }, []);
  }, [entries, products]);

  const itemCount = useMemo(
    () => entries.reduce((sum, e) => sum + e.quantity, 0),
    [entries]
  );

  const subtotalCents = useMemo(
    () =>
      items.reduce(
        (sum, item) =>
          sum + (item.product.sale_price_cents ?? item.product.price_cents) * item.quantity,
        0
      ),
    [items]
  );

  return { items, itemCount, subtotalCents, addToCart, removeFromCart, updateQuantity, clearCart };
}
