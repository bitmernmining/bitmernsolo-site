import { createClient } from "@/lib/supabase/client";
import type { Product } from "@/types/shop";
import type { CoinSymbol } from "@/types/coin";

/** Fetch all active (non-draft) products */
export async function fetchProducts(): Promise<Product[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .neq("status", "draft")
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Error fetching products:", error);
    return [];
  }

  return (data ?? []).map(rowToProduct);
}

/** Fetch a single product by slug (non-draft only) */
export async function fetchProductBySlug(slug: string): Promise<Product | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .neq("status", "draft")
    .single();

  if (error || !data) return null;
  return rowToProduct(data);
}

/** Fetch a single product by ID */
export async function fetchProductById(id: string): Promise<Product | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) return null;
  return rowToProduct(data);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function rowToProduct(row: any): Product {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    description: row.description,
    short_desc: row.short_desc,
    brand: row.brand,
    algorithm: row.algorithm,
    coin_compatible: (row.coin_compatible ?? []) as CoinSymbol[],
    hashrate: row.hashrate,
    hashrate_unit: row.hashrate_unit,
    power_watts: row.power_watts,
    price_cents: row.price_cents,
    sale_price_cents: row.sale_price_cents ?? null,
    stripe_price_id: row.stripe_price_id ?? null,
    images: row.images ?? [],
    specs: row.specs ?? {},
    stock_count: row.stock_count,
    status: row.status,
    featured: row.featured,
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}
