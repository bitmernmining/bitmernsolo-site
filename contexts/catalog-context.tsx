"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import type { Product } from "@/types/shop";

interface CatalogContextValue {
  products: Product[];
  loading: boolean;
  error: string | null;
  retry: () => void;
}

const CatalogContext = createContext<CatalogContextValue | null>(null);

export function CatalogProvider({ children }: { children: ReactNode }): ReactNode {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [fetchTrigger, setFetchTrigger] = useState(0);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch("/api/products")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch products");
        return res.json() as Promise<Product[]>;
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.warn("[CatalogContext]", { err });
        setError("Failed to load products");
        setLoading(false);
      });
  }, [fetchTrigger]); // Re-runs when retry() increments trigger

  const retry = useCallback(() => setFetchTrigger((n) => n + 1), []);

  return (
    <CatalogContext.Provider value={{ products, loading, error, retry }}>
      {children}
    </CatalogContext.Provider>
  );
}

export function useCatalogContext(): CatalogContextValue {
  const ctx = useContext(CatalogContext);
  if (!ctx) throw new Error("useCatalogContext must be used within CatalogProvider");
  return ctx;
}
