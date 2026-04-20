"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import type { Product } from "@/types/shop";

interface CatalogContextValue {
  products: Product[];
  loading: boolean;
}

const CatalogContext = createContext<CatalogContextValue | null>(null);

export function CatalogProvider({ children }: { children: ReactNode }): ReactNode {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch products");
        return res.json() as Promise<Product[]>;
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []); // Empty dep array — single fetch per mount

  return (
    <CatalogContext.Provider value={{ products, loading }}>
      {children}
    </CatalogContext.Provider>
  );
}

export function useCatalogContext(): CatalogContextValue {
  const ctx = useContext(CatalogContext);
  if (!ctx) throw new Error("useCatalogContext must be used within CatalogProvider");
  return ctx;
}
