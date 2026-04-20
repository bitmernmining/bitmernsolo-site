import { z } from "zod";

/**
 * Format-only slug validation. Does NOT check if the slug exists in the DB.
 * Non-existent slugs are handled by the DB returning null (fetchProductBySlug returns null).
 * Permissive pattern: word chars + hyphens, 1-100 chars.
 */
export const SlugSchema = z.string()
  .min(1, "Slug must not be empty")
  .max(100, "Slug too long")
  .regex(/^[\w-]+$/, "Slug must contain only letters, numbers, hyphens, or underscores");
