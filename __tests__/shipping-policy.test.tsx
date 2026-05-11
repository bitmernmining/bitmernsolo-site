import { describe, expect, test } from "bun:test";
import { render, screen } from "@testing-library/react";
import ShippingPolicyPage, { metadata } from "@/app/shipping-policy/page";

describe("ShippingPolicyPage", () => {
  test("exports SEO metadata with title and description", () => {
    expect(metadata.title).toBeDefined();
    expect(String(metadata.title)).toMatch(/Shipping Policy/i);
    expect(metadata.description).toBeDefined();
    expect(String(metadata.description).length).toBeGreaterThan(40);
  });

  test("renders the primary heading", () => {
    render(<ShippingPolicyPage />);
    expect(
      screen.getByRole("heading", { level: 1, name: /shipping policy/i }),
    ).toBeInTheDocument();
  });

  test("renders all required section headings", () => {
    render(<ShippingPolicyPage />);
    const required = [
      /shipping regions/i,
      /processing times/i,
      /carriers/i,
      /shipping costs/i,
      /customs (and|&) duties/i,
      /lost or damaged/i,
      /returns/i,
    ];
    for (const pattern of required) {
      expect(
        screen.getByRole("heading", { level: 2, name: pattern }),
      ).toBeInTheDocument();
    }
  });

  test("includes a last-updated line", () => {
    render(<ShippingPolicyPage />);
    expect(screen.getByText(/last updated/i)).toBeInTheDocument();
  });
});
