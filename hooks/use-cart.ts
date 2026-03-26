"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { fetchProducts } from "@/lib/products";
import type { Product } from "@/types/shop";

interface CartEntry {
  productId: string;
  quantity: number;
}

export interface CartItemWithProduct {
  productId: string;
  quantity: number;
  product: Product;
}

const CART_KEY = "bitmern-cart";

function loadCart(): CartEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveCart(items: CartEntry[]): void {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
}

export function useCart() {
  const [entries, setEntries] = useState<CartEntry[]>(loadCart);
  const [catalog, setCatalog] = useState<Product[]>([]);
  const isInitialRender = useRef(true);

  useEffect(() => {
    fetchProducts().then(setCatalog);
  }, []);

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }
    saveCart(entries);
  }, [entries]);

  const addToCart = useCallback((productId: string, quantity = 1) => {
    setEntries((prev) => {
      const product = catalog.find((p) => p.id === productId);
      const maxQty = product?.stock_count ?? Infinity;
      const existing = prev.find((e) => e.productId === productId);
      if (existing) {
        return prev.map((e) =>
          e.productId === productId
            ? { ...e, quantity: Math.min(e.quantity + quantity, maxQty) }
            : e
        );
      }
      return [...prev, { productId, quantity: Math.min(quantity, maxQty) }];
    });
  }, [catalog]);

  const removeFromCart = useCallback((productId: string) => {
    setEntries((prev) => prev.filter((e) => e.productId !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      setEntries((prev) => prev.filter((e) => e.productId !== productId));
    } else {
      const product = catalog.find((p) => p.id === productId);
      const maxQty = product?.stock_count ?? Infinity;
      setEntries((prev) =>
        prev.map((e) =>
          e.productId === productId ? { ...e, quantity: Math.min(quantity, maxQty) } : e
        )
      );
    }
  }, [catalog]);

  const clearCart = useCallback(() => {
    setEntries([]);
  }, []);

  const items: CartItemWithProduct[] = useMemo(() => {
    return entries.reduce<CartItemWithProduct[]>((acc, entry) => {
      const product = catalog.find((p) => p.id === entry.productId);
      if (product) {
        acc.push({ ...entry, product });
      }
      return acc;
    }, []);
  }, [entries, catalog]);

  const itemCount = useMemo(
    () => entries.reduce((sum, e) => sum + e.quantity, 0),
    [entries]
  );

  const subtotalCents = useMemo(
    () =>
      items.reduce(
        (sum, item) =>
          sum +
          (item.product.sale_price_cents ?? item.product.price_cents) *
            item.quantity,
        0
      ),
    [items]
  );

  return {
    items,
    itemCount,
    subtotalCents,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };
}
