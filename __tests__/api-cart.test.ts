import { describe, test, expect, mock, beforeEach } from "bun:test";

// Set up iron-session mock state (mutable shared across tests)
let mockCart: unknown = [];
const mockSave = mock(async () => {});
const mockSession = {
  get cart() {
    return mockCart;
  },
  set cart(v: unknown) {
    mockCart = v;
  },
  save: mockSave,
};
const mockGetIronSession = mock(async () => mockSession);
const mockCookies = mock(async () => ({}));

// Register mocks BEFORE dynamic imports (bun:test mock.module hoisting pattern)
mock.module("iron-session", () => ({ getIronSession: mockGetIronSession }));
mock.module("next/headers", () => ({ cookies: mockCookies }));

// Dynamic imports AFTER mock registration
const { POST: addPost } = await import("@/app/api/cart/add/route");
const { POST: updatePost } = await import("@/app/api/cart/update/route");
const { POST: removePost } = await import("@/app/api/cart/remove/route");
const { POST: clearPost } = await import("@/app/api/cart/clear/route");

beforeEach(() => {
  mockCart = [];
  mockSave.mockClear();
  mockGetIronSession.mockClear();
});

describe("POST /api/cart/add stock clamping (BUG-01)", () => {
  test("returns { clamped: true, clampedTo: N } when quantity exceeds stock", async () => {
    const req = new Request("http://localhost", {
      method: "POST",
      body: JSON.stringify({ productId: "p1", quantity: 10, stockCount: 5 }),
    });
    const res = await addPost(req);
    const body = await res.json();
    expect(body.clamped).toBe(true);
    expect(body.clampedTo).toBe(5);
    expect(body.success).toBe(true);
  });

  test("returns { clamped: false, clampedTo: null } for quantity within stock", async () => {
    const req = new Request("http://localhost", {
      method: "POST",
      body: JSON.stringify({ productId: "p1", quantity: 2, stockCount: 10 }),
    });
    const res = await addPost(req);
    const body = await res.json();
    expect(body.clamped).toBe(false);
    expect(body.clampedTo).toBeNull();
    expect(body.success).toBe(true);
  });

  test("merges with existing entry quantity before clamping", async () => {
    // Existing: qty=3; new add: qty=4; total=7 > stockCount=5 → clamped to 5
    mockCart = [{ productId: "p1", quantity: 3 }];
    const req = new Request("http://localhost", {
      method: "POST",
      body: JSON.stringify({ productId: "p1", quantity: 4, stockCount: 5 }),
    });
    const res = await addPost(req);
    const body = await res.json();
    expect(body.clamped).toBe(true);
    expect(body.clampedTo).toBe(5);
    const entry = body.cart.find((e: { productId: string }) => e.productId === "p1");
    expect(entry?.quantity).toBe(5);
  });
});

describe("POST /api/cart/update", () => {
  test("clamps quantity to stockCount and returns clamped: true when quantity exceeds stock", async () => {
    mockCart = [{ productId: "p1", quantity: 5 }];
    const req = new Request("http://localhost", {
      method: "POST",
      body: JSON.stringify({ productId: "p1", quantity: 20, stockCount: 5 }),
    });
    const res = await updatePost(req);
    const body = await res.json();
    expect(body.clamped).toBe(true);
    expect(body.clampedTo).toBe(5);
    expect(body.success).toBe(true);
  });

  test("removes entry from cart when quantity set to 0", async () => {
    mockCart = [{ productId: "p1", quantity: 5 }];
    const req = new Request("http://localhost", {
      method: "POST",
      body: JSON.stringify({ productId: "p1", quantity: 0, stockCount: 10 }),
    });
    const res = await updatePost(req);
    const body = await res.json();
    expect(body.success).toBe(true);
    const hasP1 = body.cart.some((e: { productId: string }) => e.productId === "p1");
    expect(hasP1).toBe(false);
  });
});

describe("POST /api/cart/remove", () => {
  test("removes item from session cart", async () => {
    mockCart = [
      { productId: "p1", quantity: 2 },
      { productId: "p2", quantity: 1 },
    ];
    const req = new Request("http://localhost", {
      method: "POST",
      body: JSON.stringify({ productId: "p1" }),
    });
    const res = await removePost(req);
    const body = await res.json();
    expect(body.success).toBe(true);
    expect(body.cart).toHaveLength(1);
    const hasP1 = body.cart.some((e: { productId: string }) => e.productId === "p1");
    expect(hasP1).toBe(false);
  });
});

describe("POST /api/cart/clear", () => {
  test("empties session cart", async () => {
    mockCart = [{ productId: "p1", quantity: 2 }];
    const req = new Request("http://localhost", {
      method: "POST",
    });
    const res = await clearPost(req);
    const body = await res.json();
    expect(body.success).toBe(true);
    expect(body.cart).toEqual([]);
  });
});
