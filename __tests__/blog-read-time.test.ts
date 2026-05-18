import { describe, expect, test } from "bun:test";
import { computeReadTime } from "@/lib/blog/read-time";

describe("computeReadTime", () => {
  test("returns 1 for empty input", () => {
    expect(computeReadTime("")).toBe(1);
  });
  test("returns 1 for very short content", () => {
    expect(computeReadTime("Hello world")).toBe(1);
  });
  test("strips HTML tags before counting", () => {
    const html = "<p>" + "word ".repeat(200) + "</p>";
    expect(computeReadTime(html)).toBe(1);
  });
  test("400 words = 2 minutes", () => {
    const html = "<p>" + "word ".repeat(400) + "</p>";
    expect(computeReadTime(html)).toBe(2);
  });
  test("rounds up — 250 words = 2 minutes", () => {
    const html = "<p>" + "word ".repeat(250) + "</p>";
    expect(computeReadTime(html)).toBe(2);
  });
  test("ignores nested tag noise", () => {
    const html = "<p><strong>" + "word ".repeat(200) + "</strong></p><img src='x' />";
    expect(computeReadTime(html)).toBe(1);
  });
});
