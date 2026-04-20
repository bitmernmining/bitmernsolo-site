import { describe, test } from "bun:test";

describe("CatalogProvider", () => {
  test.todo("fetches /api/products exactly once on mount (BUG-02)");
  test.todo("does not re-fetch when child components re-render");
  test.todo("provides products array to consumers via useCatalogContext");
  test.todo("provides loading: true before fetch completes");
  test.todo("provides loading: false after fetch completes");
});

describe("useCatalogContext", () => {
  test.todo("throws when used outside CatalogProvider");
});
