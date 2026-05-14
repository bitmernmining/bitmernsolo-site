import { describe, expect, test } from "bun:test";
import { renderFaqAnswer } from "@/lib/markdown";

describe("renderFaqAnswer", () => {
  test("renders bold and italic", () => {
    const html = renderFaqAnswer("This is **bold** and *italic*.");
    expect(html).toMatch(/<strong>bold<\/strong>/);
    expect(html).toMatch(/<em>italic<\/em>/);
  });

  test("renders an unordered list", () => {
    const html = renderFaqAnswer("- one\n- two");
    expect(html).toMatch(/<ul>/);
    expect(html).toMatch(/<li>one<\/li>/);
  });

  test("renders a safe link with rel=noopener", () => {
    const html = renderFaqAnswer("See [shipping](/shipping-policy).");
    expect(html).toMatch(/<a [^>]*href="\/shipping-policy"[^>]*>shipping<\/a>/);
    expect(html).toMatch(/rel="[^"]*noopener[^"]*"/);
  });

  test("strips a script tag", () => {
    const html = renderFaqAnswer('Hi <script>alert(1)</script> there');
    expect(html).not.toMatch(/<script/);
  });

  test("blocks javascript: URLs", () => {
    const html = renderFaqAnswer('[me](javascript:alert(1))');
    expect(html).not.toMatch(/javascript:/i);
  });

  test("strips img (not in allow-list)", () => {
    const html = renderFaqAnswer('![alt](https://evil.example/x.png)');
    expect(html).not.toMatch(/<img/);
  });
});
