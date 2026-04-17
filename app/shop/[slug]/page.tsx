"use client";

import { use, useState, useEffect } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchProductBySlug } from "@/lib/products";
import { ProductImageGallery } from "@/components/shop/product-image-gallery";
import { formatPriceCents, formatHashrate, formatWatts, formatEfficiency } from "@/lib/format";
import { useCartContext } from "@/contexts/cart-context";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ShoppingCart,
  Cpu,
  Minus,
  Plus,
  Zap,
  Weight,
  Volume2,
  Ruler,
  Plug,
  Wind,
  Gauge,
  Check,
  ArrowRight,
} from "lucide-react";

interface ProductDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default function ProductDetailPage({
  params,
}: ProductDetailPageProps): React.ReactNode {
  const { slug } = use(params);
  const [product, setProduct] = useState<import("@/types/shop").Product | null>(null);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    fetchProductBySlug(slug).then((p) => {
      setProduct(p);
      setPageLoading(false);
    });
  }, [slug]);

  const { addToCart, itemCount } = useCartContext();
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);

  if (pageLoading) {
    return (
      <div className="flex items-center justify-center py-24 text-muted-foreground">
        <span className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent mr-2" />
        Loading product...
      </div>
    );
  }

  if (!product) {
    notFound();
  }

  const effectivePrice = product.sale_price_cents ?? product.price_cents;
  const hasDiscount =
    product.sale_price_cents !== null &&
    product.sale_price_cents < product.price_cents;
  const productId = product.id;

  function handleAddToCart() {
    setAdding(true);
    setTimeout(() => {
      addToCart(productId, quantity);
      setAdding(false);
      setAdded(true);
      setQuantity(1);
      setTimeout(() => setAdded(false), 2500);
    }, 400);
  }

  return (
    <div className="space-y-8 pb-20 lg:pb-0">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
        <Link
          href="/shop"
          className="flex items-center gap-1 hover:text-foreground transition-colors"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
          Shop Miners
        </Link>
        <span className="text-muted-foreground/40">/</span>
        <span className="text-foreground font-medium truncate">
          {product.name}
        </span>
      </nav>

      {/* Main product section */}
      <div className="grid gap-8 lg:grid-cols-[1fr_420px] items-start">
        {/* Left: image + description */}
        <div className="space-y-6">
          {/* Product image gallery */}
          <div className="relative">
            <ProductImageGallery images={product.images} productName={product.name} />
            {hasDiscount && (
              <span className="absolute top-4 right-4 z-10 rounded-md bg-primary px-2.5 py-1 text-xs font-bold text-primary-foreground">
                SALE
              </span>
            )}
          </div>

          {/* Description */}
          <div>
            <h3 className="text-sm font-semibold mb-2">About this miner</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Specs grid */}
          <div>
            <h3 className="text-sm font-semibold mb-3">Specifications</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <SpecTile
                icon={<Cpu className="h-4 w-4" />}
                label="Hashrate"
                value={formatHashrate(product.hashrate)}
              />
              <SpecTile
                icon={<Zap className="h-4 w-4" />}
                label="Power"
                value={formatWatts(product.power_watts)}
              />
              <SpecTile
                icon={<Gauge className="h-4 w-4" />}
                label="Efficiency"
                value={formatEfficiency(product.hashrate, product.power_watts, product.algorithm)}
              />
              <SpecTile
                icon={<Wind className="h-4 w-4" />}
                label="Cooling"
                value={product.specs.cooling ?? "Air"}
              />
              {product.specs.noise_db != null && (
                <SpecTile
                  icon={<Volume2 className="h-4 w-4" />}
                  label="Noise"
                  value={`${product.specs.noise_db} dB`}
                />
              )}
              {product.specs.weight_kg != null && (
                <SpecTile
                  icon={<Weight className="h-4 w-4" />}
                  label="Weight"
                  value={`${product.specs.weight_kg} kg`}
                />
              )}
              {product.specs.dimensions && (
                <SpecTile
                  icon={<Ruler className="h-4 w-4" />}
                  label="Dimensions"
                  value={product.specs.dimensions}
                />
              )}
              {product.specs.voltage && (
                <SpecTile
                  icon={<Plug className="h-4 w-4" />}
                  label="Voltage"
                  value={product.specs.voltage}
                />
              )}
            </div>
          </div>
        </div>

        {/* Right: sticky purchase panel */}
        <div className="lg:sticky lg:top-6 lg:max-h-[calc(100vh-3rem)] lg:overflow-y-auto lg:scrollbar-none space-y-5">
          {/* Product info */}
          <div className="rounded-xl border border-border/20 bg-card/50 p-5 space-y-4">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground mb-1">
                {product.brand}
              </p>
              <h1 className="font-heading text-2xl font-bold tracking-tight">
                {product.name}
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                {product.short_desc}
              </p>
            </div>

            {/* Coin compatibility */}
            <div className="flex flex-wrap gap-1.5">
              {product.coin_compatible.map((coin) => (
                <Badge
                  key={coin}
                  variant="secondary"
                  className="text-xs border border-border/30"
                >
                  {coin}
                </Badge>
              ))}
              <span className="inline-flex items-center px-2 py-0.5 text-[11px] text-muted-foreground/60">
                {product.algorithm}
              </span>
            </div>

            {/* Price */}
            <div className="pt-2 border-t border-border/20">
              <div className="flex items-baseline gap-2">
                {hasDiscount && (
                  <span className="text-base text-muted-foreground line-through">
                    {formatPriceCents(product.price_cents)}
                  </span>
                )}
                <span className="text-3xl font-bold font-heading tracking-tight">
                  {formatPriceCents(effectivePrice)}
                </span>
              </div>
              {hasDiscount && (
                <p className="text-xs text-primary font-medium mt-0.5">
                  Save{" "}
                  {formatPriceCents(
                    product.price_cents - (product.sale_price_cents ?? 0)
                  )}
                </p>
              )}
            </div>

            {/* Stock */}
            <StockIndicator count={product.stock_count} />

            {/* Quantity + Add to cart */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                <div className="flex items-center rounded-lg border border-border/30 overflow-hidden">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="flex h-10 w-10 items-center justify-center hover:bg-muted/50 transition-colors"
                    disabled={product.stock_count === 0 || quantity <= 1}
                    aria-label="Decrease quantity"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="w-10 text-center font-mono font-medium text-sm border-x border-border/30">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(product.stock_count, q + 1))}
                    className="flex h-10 w-10 items-center justify-center hover:bg-muted/50 transition-colors"
                    disabled={product.stock_count === 0 || quantity >= product.stock_count}
                    aria-label="Increase quantity"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>
                <Button
                  className="flex-1 gap-2 h-10"
                  disabled={product.stock_count === 0 || adding}
                  onClick={handleAddToCart}
                >
                  {product.stock_count === 0 ? (
                    "Out of Stock"
                  ) : adding ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      Adding...
                    </>
                  ) : added ? (
                    <>
                      <Check className="h-4 w-4" />
                      Added!
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="h-4 w-4" />
                      Add to Cart
                    </>
                  )}
                </Button>
              </div>
              {itemCount > 0 && (
                <Link
                  href="/shop/cart"
                  className="flex items-center justify-center gap-2 rounded-lg border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-medium text-primary hover:bg-primary/10 transition-colors"
                >
                  Go to Cart ({itemCount})
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile sticky add-to-cart bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border/30 bg-background/95 backdrop-blur-sm px-4 py-3 lg:hidden">
        <div className="flex items-center gap-3 max-w-lg mx-auto">
          <div className="min-w-0 flex-1">
            <p className="text-xs text-muted-foreground truncate">{product.name}</p>
            <p className="text-lg font-bold font-heading">{formatPriceCents(effectivePrice)}</p>
          </div>
          <Button
            className="gap-2 h-10 shrink-0"
            disabled={product.stock_count === 0 || adding}
            onClick={handleAddToCart}
          >
            {product.stock_count === 0 ? (
              "Out of Stock"
            ) : adding ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Adding...
              </>
            ) : added ? (
              <>
                <Check className="h-4 w-4" />
                Added!
              </>
            ) : (
              <>
                <ShoppingCart className="h-4 w-4" />
                Add to Cart
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

function SpecTile({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}): React.ReactNode {
  return (
    <div className="rounded-lg border border-border/20 bg-background/50 p-3">
      <div className="flex items-center gap-1.5 mb-1">
        <span className="text-primary/70">{icon}</span>
        <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
          {label}
        </span>
      </div>
      <p className="text-sm font-bold font-mono">{value}</p>
    </div>
  );
}

function StockIndicator({ count }: { count: number }): React.ReactNode {
  if (count === 0) {
    return (
      <div className="flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-red-400" />
        <span className="text-sm text-red-400 font-medium">Out of stock</span>
      </div>
    );
  }
  if (count < 5) {
    return (
      <div className="flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-yellow-400" />
        <span className="text-sm text-yellow-400 font-medium">
          Low stock — {count} left
        </span>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-2">
      <span className="h-2 w-2 rounded-full bg-green-400" />
      <span className="text-sm text-green-400 font-medium">
        In stock ({count} available)
      </span>
    </div>
  );
}
