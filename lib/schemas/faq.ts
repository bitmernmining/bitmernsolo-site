import { z } from "zod";

export const FaqCategorySchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  // Stricter than SlugSchema in slug.ts (no underscores): FAQ category slugs
  // are admin-authored and don't need the grandfathered underscore allowance.
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/, "slug must be lowercase, digits, hyphens"),
  display_order: z.number().int(),
  created_at: z.string(),
  updated_at: z.string(),
});
export type FaqCategory = z.infer<typeof FaqCategorySchema>;

export const FaqSchema = z.object({
  id: z.string(),
  question: z.string().min(1),
  answer: z.string().min(1),
  category_id: z.string().nullable(),
  display_order: z.number().int(),
  is_published: z.boolean(),
  created_at: z.string(),
  updated_at: z.string(),
});
export type Faq = z.infer<typeof FaqSchema>;

export const FaqGroupSchema = z.object({
  category: FaqCategorySchema.nullable(),
  faqs: z.array(FaqSchema),
});
export type FaqGroup = z.infer<typeof FaqGroupSchema>;

export const FaqListResponseSchema = z.object({ groups: z.array(FaqGroupSchema) });
export type FaqListResponse = z.infer<typeof FaqListResponseSchema>;
