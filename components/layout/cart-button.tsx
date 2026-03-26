"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCartContext } from "@/contexts/cart-context";
import { Button } from "@/components/ui/button";

export function CartButton() {
  const { itemCount } = useCartContext();

  return (
    <Button
      variant="ghost"
      size="icon"
      className="relative h-8 w-8"
      asChild
    >
      <Link href="/shop/cart">
        <ShoppingCart className="h-4 w-4" />
        {itemCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
            {itemCount > 99 ? "99+" : itemCount}
          </span>
        )}
      </Link>
    </Button>
  );
}
