"use client";

import Link from "next/link";
import Image from "next/image";
import { formatPriceCents, formatHashrate, formatWatts, formatEfficiency } from "@/lib/format";
import type { Product } from "@/types/shop";
import { Zap, Cpu, Gauge, Wind, ArrowRight, Box } from "lucide-react";

function StockDot({ count }: { count: number }) {
  if (count === 0)
    return (
      <span className="flex items-center gap-1.5 text-[11px] text-red-400">
        <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
        Out of stock
      </span>
    );
  if (count < 5)
    return (
      <span className="flex items-center gap-1.5 text-[11px] text-yellow-400">
        <span className="h-1.5 w-1.5 rounded-full bg-yellow-400" />
        {count} left
      </span>
    );
  return (
    <span className="flex items-center gap-1.5 text-[11px] text-green-400">
      <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
      In stock
    </span>
  );
}

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const effectivePrice = product.sale_price_cents ?? product.price_cents;
  const hasDiscount =
    product.sale_price_cents !== null &&
    product.sale_price_cents < product.price_cents;
  const efficiency = formatEfficiency(product.hashrate, product.power_watts, product.algorithm);

  return (
    <Link href={`/shop/${product.slug}`} className="group block">
      <div className={`relative rounded-lg border border-border/30 bg-card/50 transition-all duration-200 hover:border-primary/30 hover:bg-card/80 h-full flex flex-col overflow-hidden${product.stock_count === 0 ? " opacity-50" : ""}`}>
        {/* Product image */}
        <div className="relative aspect-[3/2] bg-gradient-to-b from-background/80 to-background/40 flex items-center justify-center p-4">
          {product.images.length > 0 ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-contain p-3 transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <Box className="h-10 w-10 text-muted-foreground/20" />
          )}
          {hasDiscount && (
            <span className="absolute top-2.5 right-2.5 rounded bg-primary/90 px-1.5 py-0.5 text-[10px] font-bold text-primary-foreground">
              SALE
            </span>
          )}
        </div>

        <div className="p-4 flex flex-col flex-1">
        {/* Brand */}
        <div className="flex items-center justify-between mb-1">
          <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            {product.brand}
          </span>
        </div>

        {/* Product name */}
        <h3 className="font-heading text-[15px] font-semibold leading-tight mb-1">
          {product.name}
        </h3>
        <p className="text-xs text-muted-foreground leading-relaxed mb-3 line-clamp-2">
          {product.short_desc}
        </p>

        {/* Spec grid */}
        <div className="grid grid-cols-2 gap-x-3 gap-y-2 mb-4 rounded-md bg-background/50 p-3 border border-border/20">
          <div className="flex items-center gap-1.5">
            <Cpu className="h-3.5 w-3.5 text-primary/70" />
            <div>
              <p className="text-[10px] text-muted-foreground leading-none">Hashrate</p>
              <p className="text-sm font-bold font-mono leading-tight">{formatHashrate(product.hashrate)}</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <Zap className="h-3.5 w-3.5 text-primary/70" />
            <div>
              <p className="text-[10px] text-muted-foreground leading-none">Power</p>
              <p className="text-sm font-bold font-mono leading-tight">{formatWatts(product.power_watts)}</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <Gauge className="h-3.5 w-3.5 text-primary/70" />
            <div>
              <p className="text-[10px] text-muted-foreground leading-none">Efficiency</p>
              <p className="text-sm font-bold font-mono leading-tight">{efficiency}</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <Wind className="h-3.5 w-3.5 text-primary/70" />
            <div>
              <p className="text-[10px] text-muted-foreground leading-none">Cooling</p>
              <p className="text-sm font-bold leading-tight">{product.specs.cooling ?? "Air"}</p>
            </div>
          </div>
        </div>

        {/* Coins */}
        <div className="flex flex-wrap gap-1 mb-4">
          {product.coin_compatible.map((coin) => (
            <span
              key={coin}
              className="inline-flex items-center rounded border border-border/30 bg-secondary/50 px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground"
            >
              {coin}
            </span>
          ))}
          <span className="inline-flex items-center px-1.5 py-0.5 text-[10px] text-muted-foreground/60">
            {product.algorithm}
          </span>
        </div>

        {/* Spacer pushes bottom to end */}
        <div className="mt-auto" />

        {/* Bottom: price + stock + arrow */}
        <div className="flex items-end justify-between pt-3 border-t border-border/20">
          <div>
            {hasDiscount && (
              <span className="text-xs text-muted-foreground line-through block leading-none mb-0.5">
                {formatPriceCents(product.price_cents)}
              </span>
            )}
            <span className="text-xl font-bold font-heading tracking-tight">
              {formatPriceCents(effectivePrice)}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <StockDot count={product.stock_count} />
            <ArrowRight className="h-4 w-4 text-muted-foreground/30 transition-all group-hover:text-primary group-hover:translate-x-0.5" />
          </div>
        </div>
        </div>
      </div>
    </Link>
  );
}
