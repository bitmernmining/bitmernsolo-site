import { describe, expect, test, mock, beforeEach } from "bun:test";
import { createHmac } from "crypto";

const revalidateTagMock = mock();
mock.module("next/cache", () => ({ revalidateTag: revalidateTagMock }));

beforeEach(() => {
  revalidateTagMock.mockClear();
  process.env.REVALIDATE_SECRET = "test-secret";
});

const { POST } = await import("@/app/api/revalidate/route");

function sign(body: string): string {
  return createHmac("sha256", "test-secret").update(body).digest("hex");
}

describe("POST /api/revalidate", () => {
  test("200 with valid signature", async () => {
    const body = JSON.stringify({ tags: ["faqs", "blog"] });
    const req = new Request("http://localhost/api/revalidate", {
      method: "POST",
      headers: { "content-type": "application/json", "x-signature": sign(body) },
      body,
    });
    const res = await POST(req);
    expect(res.status).toBe(200);
    expect(revalidateTagMock).toHaveBeenCalledTimes(2);
  });

  test("401 missing signature", async () => {
    const body = JSON.stringify({ tags: ["faqs"] });
    const req = new Request("http://localhost/api/revalidate", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body,
    });
    expect((await POST(req)).status).toBe(401);
  });

  test("401 wrong signature", async () => {
    const body = JSON.stringify({ tags: ["faqs"] });
    const req = new Request("http://localhost/api/revalidate", {
      method: "POST",
      headers: { "content-type": "application/json", "x-signature": "bad" },
      body,
    });
    expect((await POST(req)).status).toBe(401);
  });

  test("400 when tags missing", async () => {
    const body = JSON.stringify({ notTags: [] });
    const req = new Request("http://localhost/api/revalidate", {
      method: "POST",
      headers: { "content-type": "application/json", "x-signature": sign(body) },
      body,
    });
    expect((await POST(req)).status).toBe(400);
  });
});
