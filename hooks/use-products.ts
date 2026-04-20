"use client";

import { useMemo } from "react";
import type { Product } from "@/types/shop";
import type { CoinSymbol } from "@/types/coin";
import { useCatalogContext } from "@/contexts/catalog-context";

export type SortOption =
  | "price-asc"
  | "price-desc"
  | "hashrate-asc"
  | "hashrate-desc"
  | "newest";

interface UseProductsOptions {
  algorithm?: string;
  brand?: string;
  inStockOnly?: boolean;
  coin?: CoinSymbol;
  search?: string;
  sort?: SortOption;
}

function getEffectivePrice(product: Product): number {
  return product.sale_price_cents ?? product.price_cents;
}

export function useProducts(options: UseProductsOptions = {}): {
  products: Product[];
  loading: boolean;
  brands: string[];
  algorithms: string[];
} {
  const { products: allProducts, loading } = useCatalogContext();

  const products = useMemo(() => {
    let result = [...allProducts];

    if (options.algorithm) {
      result = result.filter((p) => p.algorithm === options.algorithm);
    }
    if (options.brand) {
      result = result.filter((p) => p.brand === options.brand);
    }
    if (options.inStockOnly) {
      result = result.filter((p) => p.stock_count > 0);
    }
    if (options.coin) {
      result = result.filter((p) => p.coin_compatible.includes(options.coin!));
    }
    if (options.search) {
      const q = options.search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.short_desc.toLowerCase().includes(q)
      );
    }

    switch (options.sort) {
      case "price-asc":
        result.sort((a, b) => getEffectivePrice(a) - getEffectivePrice(b));
        break;
      case "price-desc":
        result.sort((a, b) => getEffectivePrice(b) - getEffectivePrice(a));
        break;
      case "hashrate-asc":
        result.sort((a, b) => a.hashrate - b.hashrate);
        break;
      case "hashrate-desc":
        result.sort((a, b) => b.hashrate - a.hashrate);
        break;
      case "newest":
        result.sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        break;
      default:
        result.sort(
          (a, b) =>
            (b.featured ? 1 : 0) - (a.featured ? 1 : 0) ||
            a.name.localeCompare(b.name)
        );
    }

    return result;
  }, [
    allProducts,
    options.algorithm,
    options.brand,
    options.inStockOnly,
    options.coin,
    options.search,
    options.sort,
  ]);

  const brands = useMemo(
    () => [...new Set(allProducts.map((p) => p.brand))].sort(),
    [allProducts]
  );

  const algorithms = useMemo(
    () => [...new Set(allProducts.map((p) => p.algorithm))].sort(),
    [allProducts]
  );

  return { products, loading, brands, algorithms };
}
