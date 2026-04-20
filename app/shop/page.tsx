"use client";

import { useState } from "react";
import { ProductCard } from "@/components/shop/product-card";
import { MinerQuiz } from "@/components/shop/miner-quiz";
import { useProducts, type SortOption } from "@/hooks/use-products";
import { useCatalogContext } from "@/contexts/catalog-context";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Search,
  SearchX,
  SlidersHorizontal,
  X,
  Compass,
  AlertCircle,
} from "lucide-react";

export default function ShopPage(): React.ReactNode {
  const [search, setSearch] = useState("");
  const [algorithm, setAlgorithm] = useState("");
  const [brand, setBrand] = useState("");
  const [sort, setSort] = useState<SortOption>("newest");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [quizOpen, setQuizOpen] = useState(false);

  const { products, brands, algorithms } = useProducts({
    search,
    algorithm: algorithm || undefined,
    brand: brand || undefined,
    sort,
    inStockOnly,
  });

  const { error: catalogError, retry: catalogRetry } = useCatalogContext();

  return (
    <div className="space-y-6">
      {/* Hero banner */}
      <div className="relative overflow-hidden rounded-xl border border-border/30 bg-gradient-to-br from-card via-card/80 to-primary/5 p-6 sm:p-8">
        <div className="pointer-events-none absolute -top-20 -right-20 h-60 w-60 rounded-full bg-primary/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-primary/5 blur-2xl" />

        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-lg">
            <h1 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
              Solo Mining Hardware
            </h1>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              Desktop miners built for solo mining. Point them at Bitmern Pool,
              chase blocks, and keep 100% of the reward.
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Button
              onClick={() => setQuizOpen(true)}
              size="sm"
              className="gap-1.5"
            >
              <Compass className="h-3.5 w-3.5" />
              Find Your Miner
            </Button>
          </div>
        </div>
      </div>

      {/* Filters bar */}
      <div className="flex flex-wrap items-center gap-2.5 rounded-lg border border-border/30 bg-card/30 px-3 py-2.5">
        <div className="relative flex-1 min-w-[180px] max-w-xs">
          <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search miners..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-8 pl-8 text-sm bg-background/50 border-border/30"
            aria-label="Search miners"
          />
        </div>
        <div className="h-5 w-px bg-border/30 hidden sm:block" />
        <Select value={algorithm || "all"} onValueChange={(v) => setAlgorithm(v === "all" ? "" : v)}>
          <SelectTrigger className="h-8 w-[130px] text-xs bg-background/50 border-border/30">
            <SelectValue placeholder="Algorithm" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Algorithms</SelectItem>
            {algorithms.map((a) => (
              <SelectItem key={a} value={a}>{a}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={brand || "all"} onValueChange={(v) => setBrand(v === "all" ? "" : v)}>
          <SelectTrigger className="h-8 w-[120px] text-xs bg-background/50 border-border/30">
            <SelectValue placeholder="Brand" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Brands</SelectItem>
            {brands.map((b) => (
              <SelectItem key={b} value={b}>{b}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={sort} onValueChange={(v) => setSort(v as SortOption)}>
          <SelectTrigger className="h-8 w-[150px] text-xs bg-background/50 border-border/30">
            <SlidersHorizontal className="mr-1.5 h-3 w-3" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="price-asc">Price: Low to High</SelectItem>
            <SelectItem value="price-desc">Price: High to Low</SelectItem>
            <SelectItem value="hashrate-desc">Hashrate: High to Low</SelectItem>
            <SelectItem value="hashrate-asc">Hashrate: Low to High</SelectItem>
          </SelectContent>
        </Select>
        <div className="h-5 w-px bg-border/30 hidden sm:block" />
        <div className="flex items-center gap-1.5">
          <Switch
            id="in-stock"
            checked={inStockOnly}
            onCheckedChange={setInStockOnly}
            className="scale-75"
          />
          <Label htmlFor="in-stock" className="text-xs text-muted-foreground cursor-pointer">
            In stock
          </Label>
        </div>
        {(search || algorithm || brand || inStockOnly) && (
          <button
            onClick={() => { setSearch(""); setAlgorithm(""); setBrand(""); setInStockOnly(false); }}
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-3 w-3" />
            Clear
          </button>
        )}
        <span className="ml-auto text-[11px] text-muted-foreground/60">
          {products.length} miner{products.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Product grid — or error state */}
      {catalogError ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="rounded-full bg-destructive/10 p-4 mb-4">
            <AlertCircle className="h-8 w-8 text-destructive/60" />
          </div>
          <h3 className="font-heading font-medium">Failed to load products</h3>
          <p className="mt-1 text-sm text-muted-foreground max-w-xs">
            Unable to reach the product catalog. Check your connection and try again.
          </p>
          <Button
            onClick={catalogRetry}
            size="sm"
            variant="outline"
            className="mt-4"
          >
            Retry
          </Button>
        </div>
      ) : products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="rounded-full bg-muted/30 p-4 mb-4">
            <SearchX className="h-8 w-8 text-muted-foreground/40" />
          </div>
          <h3 className="font-heading font-medium">No miners found</h3>
          <p className="mt-1 text-sm text-muted-foreground max-w-xs">
            Try adjusting your filters or search terms
          </p>
          {(search || algorithm || brand || inStockOnly) && (
            <button
              onClick={() => { setSearch(""); setAlgorithm(""); setBrand(""); setInStockOnly(false); }}
              className="mt-3 text-sm text-primary hover:text-primary/80 font-medium transition-colors"
            >
              Clear all filters
            </button>
          )}
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* Quiz drawer */}
      <MinerQuiz open={quizOpen} onOpenChange={setQuizOpen} />
    </div>
  );
}
