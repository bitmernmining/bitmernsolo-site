import { z } from "zod";
import { CoinSymbolSchema } from "./coin";

export const ProductStatusSchema = z.enum(["active", "draft", "out_of_stock"]);
export type ProductStatus = z.infer<typeof ProductStatusSchema>;

const ProductSpecsSchema = z.object({
  weight_kg: z.number().optional(),
  dimensions: z.string().optional(),
  noise_db: z.number().optional(),
  voltage: z.string().optional(),
  cooling: z.string().optional(),
  interface: z.string().optional(),
}).default({});

export const ProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  description: z.string(),
  short_desc: z.string(),
  brand: z.string(),
  algorithm: z.string(),
  coin_compatible: z.array(CoinSymbolSchema).default([]),
  hashrate: z.number(),
  hashrate_unit: z.string(),
  power_watts: z.number(),
  price_cents: z.number(),
  sale_price_cents: z.number().nullable().default(null),
  stripe_price_id: z.string().nullable().default(null),
  images: z.array(z.string()).default([]),
  specs: ProductSpecsSchema,
  stock_count: z.number(),
  status: ProductStatusSchema,
  featured: z.boolean(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type Product = z.infer<typeof ProductSchema>;
