import { describe, expect, test, beforeEach, mock } from "bun:test";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";

const fetchMock = mock();

beforeEach(() => {
  cleanup();
  fetchMock.mockClear();
  globalThis.fetch = fetchMock as typeof fetch;
});

const { ContactForm } = await import("@/components/support/contact-form");

function fill() {
  fireEvent.change(screen.getByLabelText(/name/i), { target: { value: "Sat" } });
  fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "sat@example.com" } });
  fireEvent.change(screen.getByLabelText(/subject/i), { target: { value: "Order Q" } });
  fireEvent.change(screen.getByLabelText(/message/i), { target: { value: "Where is it?" } });
}

describe("ContactForm", () => {
  test("submits and shows success on 200", async () => {
    fetchMock.mockResolvedValueOnce(new Response(JSON.stringify({ id: "abc" }), { status: 200 }));
    render(<ContactForm onBack={() => {}} onSuccess={() => {}} />);
    fill();
    fireEvent.click(screen.getByRole("button", { name: /send/i }));
    await waitFor(() => expect(fetchMock).toHaveBeenCalled());
    await waitFor(() => expect(screen.getByText(/got it/i)).toBeInTheDocument());
  });

  test("validation error on empty submit", async () => {
    render(<ContactForm onBack={() => {}} onSuccess={() => {}} />);
    fireEvent.click(screen.getByRole("button", { name: /send/i }));
    await waitFor(() => expect(screen.getAllByText(/required/i).length).toBeGreaterThanOrEqual(1));
    expect(fetchMock).not.toHaveBeenCalled();
  });

  test("rate-limit message on 429", async () => {
    fetchMock.mockResolvedValueOnce(new Response(JSON.stringify({ error: "Too many" }), { status: 429 }));
    render(<ContactForm onBack={() => {}} onSuccess={() => {}} />);
    fill();
    fireEvent.click(screen.getByRole("button", { name: /send/i }));
    await waitFor(() => expect(screen.getByText(/too many/i)).toBeInTheDocument());
  });

  test("generic error on 500", async () => {
    fetchMock.mockResolvedValueOnce(new Response(JSON.stringify({ error: "boom" }), { status: 500 }));
    render(<ContactForm onBack={() => {}} onSuccess={() => {}} />);
    fill();
    fireEvent.click(screen.getByRole("button", { name: /send/i }));
    await waitFor(() => expect(screen.getByText(/try again/i)).toBeInTheDocument());
  });
});
