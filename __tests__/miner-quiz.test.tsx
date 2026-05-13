import { describe, test, expect, mock, afterEach, beforeEach } from "bun:test";
import { render, screen, fireEvent, waitFor, cleanup } from "@testing-library/react";
import { createElement } from "react";

// Mock next/image before component import
mock.module("next/image", () => ({
  default: ({ src, alt }: { src: string; alt: string }) =>
    createElement("img", { src, alt }),
}));

// Mock next/link before component import
mock.module("next/link", () => ({
  default: ({
    href,
    children,
    className,
  }: {
    href: string;
    children: React.ReactNode;
    className?: string;
  }) => createElement("a", { href, className }, children),
}));

// Mock lucide-react to avoid loading 3500+ individual icon ESM files in bun:test
mock.module("lucide-react", () => ({
  Monitor: () => null,
  Sofa: () => null,
  Warehouse: () => null,
  Server: () => null,
  Zap: () => null,
  Cpu: () => null,
  TrendingUp: () => null,
  Wind: () => null,
  ArrowLeft: () => null,
  ArrowRight: () => null,
  RotateCcw: () => null,
  ChevronRight: () => null,
}));

// Mock radix-ui Dialog (Sheet) so portals render in happy-dom
// SheetContent renders children regardless of portal — Sheet passes open state down
mock.module("radix-ui", () => {
  const Dialog = {
    Root: ({ open, children }: { open?: boolean; children?: React.ReactNode }) =>
      open ? createElement("div", { "data-testid": "sheet-root" }, children) : null,
    Trigger: ({ children }: { children?: React.ReactNode }) =>
      createElement("div", null, children),
    Portal: ({ children }: { children?: React.ReactNode }) =>
      createElement("div", null, children),
    Overlay: () => createElement("div", { "data-slot": "sheet-overlay" }),
    Content: ({
      children,
      className,
    }: {
      children?: React.ReactNode;
      className?: string;
    }) => createElement("div", { "data-slot": "sheet-content", className }, children),
    Close: ({ children, className }: { children?: React.ReactNode; className?: string }) =>
      createElement("button", { className }, children),
    Title: ({
      children,
      className,
    }: {
      children?: React.ReactNode;
      className?: string;
    }) => createElement("h2", { className }, children),
    Description: ({
      children,
      className,
    }: {
      children?: React.ReactNode;
      className?: string;
    }) => createElement("p", { className }, children),
  };
  // radix-ui also exports Slot used by Badge/Button
  const Slot = {
    Root: ({
      children,
      ...props
    }: { children?: React.ReactNode; [key: string]: unknown }) =>
      createElement("span", props as React.HTMLAttributes<HTMLSpanElement>, children),
  };
  return { Dialog, Slot };
});

// Mock fetch before dynamic component import
const originalFetch = globalThis.fetch;
globalThis.fetch = mock(
  async () => ({ ok: true, json: async () => [] }) as unknown as Response
);

const { MinerQuiz } = await import("@/components/shop/miner-quiz");

beforeEach(() => {
  cleanup();
});

afterEach(() => {
  globalThis.fetch = originalFetch;
});

// Helper: render MinerQuiz with default noop onOpenChange
function renderQuiz(open: boolean) {
  return render(
    createElement(MinerQuiz, { open, onOpenChange: () => {} })
  );
}

describe("MinerQuiz component (TEST-02)", () => {
  test("renders first question when open=true", async () => {
    renderQuiz(true);
    // Step 1 is "coin" — asks "What coin do you want to mine?"
    await waitFor(() => {
      expect(screen.getByText(/What coin do you want to mine/i)).toBeTruthy();
    });
  });

  test("does not render quiz content when open=false", () => {
    renderQuiz(false);
    // Sheet root is hidden when open=false — question text should not be in DOM
    expect(screen.queryByText(/What coin do you want to mine/i)).toBeNull();
  });

  test("clicking an answer option enables Next and advances the quiz", async () => {
    renderQuiz(true);

    // Wait for coin step to render
    await waitFor(() => {
      expect(screen.getByText(/What coin do you want to mine/i)).toBeTruthy();
    });

    // Click "Bitcoin" coin option (BTC is enabled)
    fireEvent.click(screen.getByText("Bitcoin"));

    // Click the Next button to advance
    const nextBtn = screen.getByText("Next");
    fireEvent.click(nextBtn);

    // Should now be on budget step
    await waitFor(() => {
      expect(screen.getByText(/What.*s your budget/i)).toBeTruthy();
    });
  });

  test("completes quiz after 4 answers and shows results state", async () => {
    renderQuiz(true);

    // Step 1: Coin — click BTC, then Next
    await waitFor(() => {
      expect(screen.getByText(/What coin do you want to mine/i)).toBeTruthy();
    });
    fireEvent.click(screen.getByText("Bitcoin"));
    fireEvent.click(screen.getByText("Next"));

    // Step 2: Budget — click first option, then Next
    await waitFor(() => {
      expect(screen.getByText(/What.*s your budget/i)).toBeTruthy();
    });
    fireEvent.click(screen.getByText("Under $100"));
    fireEvent.click(screen.getByText("Next"));

    // Step 3: Environment — click first option, then Next
    await waitFor(() => {
      expect(screen.getByText(/Where will you run it/i)).toBeTruthy();
    });
    fireEvent.click(screen.getByText("Desktop / Office"));
    fireEvent.click(screen.getByText("Next"));

    // Step 4: Priority — click first option, then Next
    await waitFor(() => {
      expect(screen.getByText(/What matters most/i)).toBeTruthy();
    });
    fireEvent.click(screen.getByText("Lowest Power"));
    fireEvent.click(screen.getByText("Next"));

    // Results state — Next button is gone; Retake Quiz appears or results/no-miners text
    await waitFor(() => {
      // Either "Your top picks" (with results) or "No miners found" (empty catalog)
      const hasPicks = screen.queryByText(/Your top picks/i);
      const hasNoMiners = screen.queryByText(/No miners found/i);
      const hasRetake = screen.queryByText(/Retake Quiz/i);
      expect(hasPicks !== null || hasNoMiners !== null || hasRetake !== null).toBe(true);
    });
  });
});
