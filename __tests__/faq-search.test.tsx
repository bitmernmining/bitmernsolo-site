import { describe, expect, test, beforeEach } from "bun:test";
import { useState } from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import type { FaqGroup } from "@/lib/schemas/faq";
import { FaqSearch } from "@/components/support/faq-search";
import { FaqList } from "@/components/support/faq-list";

const groups: FaqGroup[] = [
  {
    category: { id: "c1", name: "Shipping", slug: "shipping", display_order: 0, created_at: "", updated_at: "" },
    faqs: [
      { id: "f1", question: "When does my order ship?", answer: "Within 1-3 days.", answer_html: "<p>Within 1-3 days.</p>", category_id: "c1", display_order: 0, is_published: true, created_at: "", updated_at: "" },
      { id: "f2", question: "Do you ship to Europe?", answer: "Yes, via DHL.", answer_html: "<p>Yes, via DHL.</p>", category_id: "c1", display_order: 1, is_published: true, created_at: "", updated_at: "" },
    ],
  },
  {
    category: { id: "c2", name: "Returns", slug: "returns", display_order: 1, created_at: "", updated_at: "" },
    faqs: [{ id: "f3", question: "How long is the return window?", answer: "30 days.", answer_html: "<p>30 days.</p>", category_id: "c2", display_order: 0, is_published: true, created_at: "", updated_at: "" }],
  },
];

function Harness() {
  const [q, setQ] = useState("");
  return (
    <>
      <FaqSearch value={q} onChange={setQ} />
      <FaqList groups={groups} query={q} />
    </>
  );
}

describe("FaqSearch + FaqList", () => {
  beforeEach(() => cleanup());

  test("renders all FAQs when search is empty", () => {
    render(<Harness />);
    expect(screen.getByText(/when does my order ship/i)).toBeInTheDocument();
    expect(screen.getByText(/return window/i)).toBeInTheDocument();
  });

  test('typing "europe" filters', () => {
    render(<Harness />);
    fireEvent.change(screen.getByRole("textbox", { name: /search/i }), { target: { value: "europe" } });
    expect(screen.getByText(/do you ship to europe/i)).toBeInTheDocument();
    expect(screen.queryByText(/when does my order ship/i)).toBeNull();
  });

  test('no matches shows "No matches"', () => {
    render(<Harness />);
    fireEvent.change(screen.getByRole("textbox", { name: /search/i }), { target: { value: "zzzzz" } });
    expect(screen.getByText(/no matches/i)).toBeInTheDocument();
  });
});
