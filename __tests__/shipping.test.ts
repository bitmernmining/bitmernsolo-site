import { describe, test, expect } from "bun:test";
import { getShippingCents, getShippingZoneName } from "@/lib/shipping";

describe("getShippingCents", () => {
  test("returns 14000 for US (North America)", () => {
    expect(getShippingCents("US")).toBe(14000);
  });

  test("returns 14000 for CA (North America)", () => {
    expect(getShippingCents("CA")).toBe(14000);
  });

  test("returns 14000 for MX (North America)", () => {
    expect(getShippingCents("MX")).toBe(14000);
  });

  test("returns 4000 for JP (Asia-Pacific)", () => {
    expect(getShippingCents("JP")).toBe(4000);
  });

  test("returns 6000 for AU (Oceania)", () => {
    expect(getShippingCents("AU")).toBe(6000);
  });

  test("returns 6000 for NZ (Oceania)", () => {
    expect(getShippingCents("NZ")).toBe(6000);
  });

  test("returns 15000 for unknown country code XX", () => {
    expect(getShippingCents("XX")).toBe(15000);
  });

  test("returns 15000 for unknown country code ZZ", () => {
    expect(getShippingCents("ZZ")).toBe(15000);
  });

  test("handles lowercase country code via toUpperCase (us -> US -> 14000)", () => {
    expect(getShippingCents("us")).toBe(14000);
  });

  test("handles lowercase jp -> 4000", () => {
    expect(getShippingCents("jp")).toBe(4000);
  });
});

describe("getShippingZoneName", () => {
  test("returns 'Oceania' for AU", () => {
    expect(getShippingZoneName("AU")).toBe("Oceania");
  });

  test("returns 'North America' for US", () => {
    expect(getShippingZoneName("US")).toBe("North America");
  });

  test("returns 'Asia-Pacific' for JP", () => {
    expect(getShippingZoneName("JP")).toBe("Asia-Pacific");
  });

  test("returns 'International' for unknown country ZZ", () => {
    expect(getShippingZoneName("ZZ")).toBe("International");
  });

  test("returns 'International' for unknown country XX", () => {
    expect(getShippingZoneName("XX")).toBe("International");
  });
});
