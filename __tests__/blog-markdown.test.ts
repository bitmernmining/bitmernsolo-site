import { describe, expect, test } from "bun:test";
import { renderBlogBody } from "@/lib/markdown";

describe("renderBlogBody", () => {
  test("preserves headings", () => {
    const html = renderBlogBody("<h2>Title</h2><h3>Sub</h3>");
    expect(html).toMatch(/<h2>Title<\/h2>/);
    expect(html).toMatch(/<h3>Sub<\/h3>/);
  });
  test("preserves img with src/alt", () => {
    const html = renderBlogBody('<img src="https://cdn.example/x.webp" alt="X" />');
    expect(html).toMatch(/<img [^>]*src="https:\/\/cdn\.example\/x\.webp"[^>]*alt="X"/);
  });
  test("strips javascript: in href", () => {
    const html = renderBlogBody('<a href="javascript:alert(1)">x</a>');
    expect(html).not.toMatch(/javascript:/i);
  });
  test("strips <script>", () => {
    const html = renderBlogBody('hi <script>alert(1)</script> there');
    expect(html).not.toMatch(/<script/);
  });
  test("preserves blockquote + code", () => {
    const html = renderBlogBody("<blockquote>quoted</blockquote><pre><code>x</code></pre>");
    expect(html).toMatch(/<blockquote>quoted<\/blockquote>/);
    expect(html).toMatch(/<pre><code>x<\/code><\/pre>/);
  });
  test("strips iframe", () => {
    const html = renderBlogBody('<iframe src="https://evil"></iframe>');
    expect(html).not.toMatch(/<iframe/);
  });
});
