import { describe, test } from "bun:test";

// Tests will be implemented once lib/schemas/coin.ts exists (created in plan 01-03).

describe("CoinSymbolSchema", () => {
  test.todo("accepts valid uppercase coin symbols: BTC, BCH, LTC, DOGE, DGB");
  test.todo("rejects lowercase coin symbol 'btc'");
  test.todo("rejects unknown symbol 'XRP'");
});

describe("SlugSchema", () => {
  test.todo("accepts a valid slug like 'antminer-s19-pro'");
  test.todo("rejects a slug with script injection '<script>'");
  test.todo("rejects a slug exceeding 100 characters");
});
