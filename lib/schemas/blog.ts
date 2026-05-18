import { z } from "zod";

export const BLOG_POST_STATUSES = ["draft", "scheduled", "published"] as const;
export const BlogPostStatusSchema = z.enum(BLOG_POST_STATUSES);
export type BlogPostStatus = z.infer<typeof BlogPostStatusSchema>;

export const AuthorSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  bio: z.string().nullable(),
  avatar_url: z.string().nullable(),
  twitter: z.string().nullable(),
  github: z.string().nullable(),
  website: z.string().nullable(),
  created_at: z.string(),
  updated_at: z.string(),
});
export type Author = z.infer<typeof AuthorSchema>;

export const AuthorRefSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  avatar_url: z.string().nullable(),
});
export type AuthorRef = z.infer<typeof AuthorRefSchema>;

export const BlogCategorySchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  display_order: z.number().int(),
  created_at: z.string(),
  updated_at: z.string(),
});
export type BlogCategory = z.infer<typeof BlogCategorySchema>;

export const BlogCategoryRefSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
});
export type BlogCategoryRef = z.infer<typeof BlogCategoryRefSchema>;

export const BlogTagSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});
export type BlogTag = z.infer<typeof BlogTagSchema>;

export const PostSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  excerpt: z.string().nullable(),
  body_html: z.string(),
  cover_image_url: z.string().nullable(),
  author_id: z.string().nullable(),
  status: BlogPostStatusSchema,
  scheduled_for: z.string().nullable(),
  published_at: z.string().nullable(),
  meta_title: z.string().nullable(),
  meta_description: z.string().nullable(),
  og_image_url: z.string().nullable(),
  read_time_minutes: z.number().int(),
  created_at: z.string(),
  updated_at: z.string(),
});
export type Post = z.infer<typeof PostSchema>;

export const PostSummarySchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  excerpt: z.string().nullable(),
  cover_image_url: z.string().nullable(),
  author: AuthorRefSchema.nullable(),
  published_at: z.string().nullable(),
  read_time_minutes: z.number().int(),
  primary_category: BlogCategoryRefSchema.nullable(),
});
export type PostSummary = z.infer<typeof PostSummarySchema>;

export const PostListResponseSchema = z.object({
  posts: z.array(PostSummarySchema),
  page: z.number().int().min(1),
  per_page: z.number().int().min(1),
  total: z.number().int().min(0),
});
export type PostListResponse = z.infer<typeof PostListResponseSchema>;

export const PostDetailResponseSchema = z.object({
  post: PostSchema,
  author: AuthorRefSchema.nullable(),
  categories: z.array(BlogCategoryRefSchema),
  tags: z.array(BlogTagSchema),
  related: z.array(PostSummarySchema).max(3),
  prev: z.object({ slug: z.string(), title: z.string() }).nullable(),
  next: z.object({ slug: z.string(), title: z.string() }).nullable(),
});
export type PostDetailResponse = z.infer<typeof PostDetailResponseSchema>;
