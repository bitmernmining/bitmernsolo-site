import { z } from "zod";

export const SUPPORT_TICKET_STATUSES = ["open", "in_progress", "resolved"] as const;
export const SupportTicketStatusSchema = z.enum(SUPPORT_TICKET_STATUSES);
export type SupportTicketStatus = z.infer<typeof SupportTicketStatusSchema>;

export const SupportTicketInputSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(120),
  email: z.string().trim().email("Valid email required").max(254),
  subject: z.string().trim().min(1, "Subject is required").max(200),
  message: z.string().trim().min(1, "Message is required").max(5000),
});
export type SupportTicketInput = z.infer<typeof SupportTicketInputSchema>;

export const SupportTicketRowSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  subject: z.string(),
  message: z.string(),
  status: SupportTicketStatusSchema,
  internal_notes: z.string().nullable(),
  reply_text: z.string().nullable(),
  reply_sent_at: z.string().nullable(),
  ip_hash: z.string().nullable(),
  created_at: z.string(),
  updated_at: z.string(),
  resolved_at: z.string().nullable(),
});
export type SupportTicketRow = z.infer<typeof SupportTicketRowSchema>;
