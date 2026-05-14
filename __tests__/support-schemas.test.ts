import { describe, expect, test } from "bun:test";
import {
  FaqCategorySchema,
  FaqSchema,
  FaqListResponseSchema,
} from "@/lib/schemas/faq";
import {
  SupportTicketInputSchema,
  SupportTicketRowSchema,
} from "@/lib/schemas/support-ticket";

describe("FaqCategorySchema", () => {
  test("accepts a valid category row", () => {
    const ok = FaqCategorySchema.parse({
      id: "11111111-1111-1111-1111-111111111111",
      name: "Shipping",
      slug: "shipping",
      display_order: 0,
      created_at: "2026-05-14T00:00:00Z",
      updated_at: "2026-05-14T00:00:00Z",
    });
    expect(ok.slug).toBe("shipping");
  });

  test("rejects missing slug", () => {
    expect(() =>
      FaqCategorySchema.parse({
        id: "11111111-1111-1111-1111-111111111111",
        name: "Shipping",
        display_order: 0,
        created_at: "2026-05-14T00:00:00Z",
        updated_at: "2026-05-14T00:00:00Z",
      }),
    ).toThrow();
  });
});

describe("FaqSchema", () => {
  test("accepts a valid FAQ row", () => {
    const faq = FaqSchema.parse({
      id: "22222222-2222-2222-2222-222222222222",
      question: "Where do you ship?",
      answer: "We ship worldwide.",
      category_id: "11111111-1111-1111-1111-111111111111",
      display_order: 0,
      is_published: true,
      created_at: "2026-05-14T00:00:00Z",
      updated_at: "2026-05-14T00:00:00Z",
    });
    expect(faq.is_published).toBe(true);
  });

  test("allows null category_id", () => {
    const faq = FaqSchema.parse({
      id: "22222222-2222-2222-2222-222222222222",
      question: "Generic",
      answer: "Generic answer.",
      category_id: null,
      display_order: 0,
      is_published: true,
      created_at: "2026-05-14T00:00:00Z",
      updated_at: "2026-05-14T00:00:00Z",
    });
    expect(faq.category_id).toBeNull();
  });
});

describe("FaqListResponseSchema", () => {
  test("accepts an empty grouped list", () => {
    const ok = FaqListResponseSchema.parse({ groups: [] });
    expect(ok.groups).toHaveLength(0);
  });

  test("rejects garbage", () => {
    expect(() => FaqListResponseSchema.parse({ groups: "nope" })).toThrow();
  });
});

describe("SupportTicketInputSchema", () => {
  test("accepts a valid contact form submission", () => {
    const ok = SupportTicketInputSchema.parse({
      name: "Sat Nakamoto",
      email: "sat@example.com",
      subject: "Order question",
      message: "Where is my ASIC?",
    });
    expect(ok.email).toBe("sat@example.com");
  });

  test("rejects an invalid email", () => {
    expect(() =>
      SupportTicketInputSchema.parse({
        name: "X",
        email: "not-an-email",
        subject: "Help",
        message: "Hi",
      }),
    ).toThrow();
  });

  test("rejects empty subject", () => {
    expect(() =>
      SupportTicketInputSchema.parse({
        name: "X",
        email: "x@y.z",
        subject: "",
        message: "Hi",
      }),
    ).toThrow();
  });

  test("rejects an oversize message (>5000 chars)", () => {
    expect(() =>
      SupportTicketInputSchema.parse({
        name: "X",
        email: "x@y.z",
        subject: "S",
        message: "x".repeat(5001),
      }),
    ).toThrow();
  });

  test("trims whitespace", () => {
    const ok = SupportTicketInputSchema.parse({
      name: "  Sat  ",
      email: "sat@example.com",
      subject: " Help ",
      message: " Hi ",
    });
    expect(ok.name).toBe("Sat");
  });
});

describe("SupportTicketRowSchema", () => {
  test("accepts a valid DB row", () => {
    const row = SupportTicketRowSchema.parse({
      id: "33333333-3333-3333-3333-333333333333",
      name: "Sat",
      email: "sat@example.com",
      subject: "Q",
      message: "M",
      status: "open",
      internal_notes: null,
      reply_text: null,
      reply_sent_at: null,
      ip_hash: null,
      created_at: "2026-05-14T00:00:00Z",
      updated_at: "2026-05-14T00:00:00Z",
      resolved_at: null,
    });
    expect(row.status).toBe("open");
  });

  test("rejects invalid status", () => {
    expect(() =>
      SupportTicketRowSchema.parse({
        id: "33333333-3333-3333-3333-333333333333",
        name: "Sat",
        email: "sat@example.com",
        subject: "Q",
        message: "M",
        status: "wat",
        internal_notes: null,
        reply_text: null,
        reply_sent_at: null,
        ip_hash: null,
        created_at: "2026-05-14T00:00:00Z",
        updated_at: "2026-05-14T00:00:00Z",
        resolved_at: null,
      }),
    ).toThrow();
  });
});
