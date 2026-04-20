import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { ProductSchema } from "@/lib/schemas/product";
import type { Product } from "@/lib/schemas/product";

export async function GET() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .neq("status", "draft")
    .order("created_at", { ascending: true });

  if (error) {
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }

  const products: Product[] = (data ?? [])
    .map((row) => {
      const result = ProductSchema.safeParse(row);
      if (!result.success) {
        console.warn("[api/products] Invalid row skipped", {
          rowId: (row as Record<string, unknown>)?.id,
        });
        return null;
      }
      return result.data;
    })
    .filter((p): p is Product => p !== null);

  return NextResponse.json(products);
}
