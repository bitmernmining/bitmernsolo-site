"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ProductCard } from "@/components/shop/product-card";
import { fetchProducts } from "@/lib/products";
import type { Product } from "@/types/shop";

export function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts().then((all) => {
      // Prioritize featured products, then fill with the rest
      const featured = all.filter((p) => p.featured);
      const rest = all.filter((p) => !p.featured);
      setProducts([...featured, ...rest].slice(0, 6));
      setLoading(false);
    });
  }, []);

  return (
    <section className="relative">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Shop mining hardware
            </h2>
            <p className="mt-2 max-w-2xl text-muted-foreground">
              From flagship ASICs to solo home miners — find the right hardware
              for your setup and start mining today.
            </p>
          </div>
          <Button variant="outline" className="hidden sm:inline-flex" asChild>
            <Link href="/shop">
              View All
              <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>

        {loading ? (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="rounded-lg border border-border/30 bg-card/50 overflow-hidden"
              >
                <Skeleton className="aspect-[3/2] w-full" />
                <div className="p-4 space-y-3">
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-20 w-full rounded-md" />
                  <Skeleton className="h-6 w-24" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        <div className="mt-8 text-center sm:hidden">
          <Button variant="outline" asChild>
            <Link href="/shop">
              View All Hardware
              <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
