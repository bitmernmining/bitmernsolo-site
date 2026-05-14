import { describe, expect, test, beforeEach, mock } from "bun:test";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";

mock.module("@/components/support/help-panel", () => ({
  HelpPanel: ({ onClose }: { onClose: () => void }) => (
    <div role="dialog" aria-label="Help">
      <button onClick={onClose}>close-helper</button>
    </div>
  ),
}));

const { SupportBubble } = await import("@/components/support/support-bubble");

describe("SupportBubble", () => {
  beforeEach(() => cleanup());

  test("renders a Support button", () => {
    render(<SupportBubble />);
    expect(screen.getByRole("button", { name: /support/i })).toBeInTheDocument();
  });

  test("opens dialog on click", () => {
    render(<SupportBubble />);
    expect(screen.queryByRole("dialog")).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: /support/i }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  test("Escape closes", () => {
    render(<SupportBubble />);
    fireEvent.click(screen.getByRole("button", { name: /support/i }));
    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("dialog")).toBeNull();
  });
});
