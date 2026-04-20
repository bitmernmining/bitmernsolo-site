import { createClient as createBrowserClient } from "@/lib/supabase/client";
import { createClient as createServerClient } from "@/lib/supabase/server";
import { ProductSchema } from "@/lib/schemas/product";
import type { Product } from "@/lib/schemas/product";

function parseProductRow(row: unknown): Product | null {
  const result = ProductSchema.safeParse(row);
  if (!result.success) {
    console.warn("[schemas] Invalid product row", {
      rowId: (row as Record<string, unknown>)?.id,
      issues: result.error.issues,
    });
    return null;
  }
  return result.data;
}

/** Fetch all active (non-draft) products */
export async function fetchProducts(): Promise<Product[]> {
  const supabase = createBrowserClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .neq("status", "draft")
    .order("created_at", { ascending: true });

  if (error) {
    console.error("[products] Error fetching products:", error);
    return [];
  }

  return (data ?? []).map(parseProductRow).filter((p): p is Product => p !== null);
}

/** Fetch a single product by slug (non-draft only) */
export async function fetchProductBySlug(slug: string): Promise<Product | null> {
  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .neq("status", "draft")
    .single();

  if (error || !data) return null;
  return parseProductRow(data);
}

/** Fetch a single product by ID */
export async function fetchProductById(id: string): Promise<Product | null> {
  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) return null;
  return parseProductRow(data);
}
