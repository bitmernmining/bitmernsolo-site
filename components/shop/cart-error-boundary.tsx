"use client";

import * as Sentry from "@sentry/nextjs";
import { CartProvider } from "@/contexts/cart-context";
import { Button } from "@/components/ui/button";
import type { ReactNode } from "react";

interface CartErrorBoundaryProps {
  children: ReactNode;
}

const CartErrorFallback = () => (
  <div className="flex flex-col items-center gap-4 py-24 text-center">
    <p className="text-sm text-muted-foreground max-w-xs">
      Your cart encountered an error. Refreshing may resolve it.
    </p>
    <Button
      variant="outline"
      size="sm"
      onClick={() => window.location.reload()}
    >
      Refresh Page
    </Button>
  </div>
);

export function CartErrorBoundary({ children }: CartErrorBoundaryProps) {
  return (
    <Sentry.ErrorBoundary fallback={<CartErrorFallback />}>
      <CartProvider>{children}</CartProvider>
    </Sentry.ErrorBoundary>
  );
}
