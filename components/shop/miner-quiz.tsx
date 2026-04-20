"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { COINS } from "@/lib/coins";
import { formatPriceCents, formatHashrate, formatWatts } from "@/lib/format";
import {
  scoreProducts,
  type BudgetRange,
  type Environment,
  type Priority,
  type ScoredProduct,
} from "@/lib/quiz-scoring";
import type { CoinSymbol } from "@/types/coin";
import {
  Monitor,
  Sofa,
  Warehouse,
  Server,
  Zap,
  Cpu,
  TrendingUp,
  Wind,
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  ChevronRight,
} from "lucide-react";

type Step = "coin" | "budget" | "environment" | "priority" | "results";
const STEPS: Step[] = ["coin", "budget", "environment", "priority", "results"];

const ALL_COINS: CoinSymbol[] = ["BTC", "BCH", "LTC", "DOGE", "DGB"];

interface MinerQuizProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MinerQuiz({ open, onOpenChange }: MinerQuizProps) {
  const [step, setStep] = useState<Step>("coin");
  const [coin, setCoin] = useState<CoinSymbol | null>(null);
  const [budget, setBudget] = useState<BudgetRange | null>(null);
  const [environment, setEnvironment] = useState<Environment | null>(null);
  const [priority, setPriority] = useState<Priority | null>(null);
  const [catalog, setCatalog] = useState<import("@/types/shop").Product[]>([]);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch products");
        return res.json() as Promise<import("@/types/shop").Product[]>;
      })
      .then(setCatalog)
      .catch(() => {});
  }, []);

  const stepIndex = STEPS.indexOf(step);
  const progress = ((stepIndex + 1) / STEPS.length) * 100;

  const resetAll = useCallback(() => {
    setStep("coin");
    setCoin(null);
    setBudget(null);
    setEnvironment(null);
    setPriority(null);
  }, []);

  const handleOpenChange = useCallback(
    (open: boolean) => {
      if (!open) resetAll();
      onOpenChange(open);
    },
    [onOpenChange, resetAll]
  );

  const canGoNext = useMemo(() => {
    switch (step) {
      case "coin":
        return coin !== null;
      case "budget":
        return budget !== null;
      case "environment":
        return environment !== null;
      case "priority":
        return priority !== null;
      case "results":
        return false;
    }
  }, [step, coin, budget, environment, priority]);

  const goNext = useCallback(() => {
    const idx = STEPS.indexOf(step);
    if (idx < STEPS.length - 1) setStep(STEPS[idx + 1]);
  }, [step]);

  const goBack = useCallback(() => {
    const idx = STEPS.indexOf(step);
    if (idx > 0) setStep(STEPS[idx - 1]);
  }, [step]);

  const results = useMemo<ScoredProduct[]>(() => {
    if (step !== "results" || !coin || !budget || !environment || !priority)
      return [];
    return scoreProducts(catalog, { coin, budget, environment, priority });
  }, [step, coin, budget, environment, priority, catalog]);

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent side="right" className="sm:max-w-md flex flex-col">
        <SheetHeader>
          <SheetTitle>Find Your Miner</SheetTitle>
          <SheetDescription>
            Answer 4 questions and we&apos;ll recommend the best miner for you.
          </SheetDescription>
          {/* Progress */}
          <div className="flex items-center gap-2 pt-2">
            {STEPS.map((s, i) => (
              <div
                key={s}
                className={`h-1.5 flex-1 rounded-full transition-colors ${
                  i <= stepIndex ? "bg-primary" : "bg-muted"
                }`}
              />
            ))}
          </div>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-4 py-2">
          {step === "coin" && (
            <StepCoin selected={coin} onSelect={setCoin} />
          )}
          {step === "budget" && (
            <StepBudget selected={budget} onSelect={setBudget} />
          )}
          {step === "environment" && (
            <StepEnvironment
              selected={environment}
              onSelect={setEnvironment}
            />
          )}
          {step === "priority" && (
            <StepPriority selected={priority} onSelect={setPriority} />
          )}
          {step === "results" && (
            <StepResults results={results} coin={coin} />
          )}
        </div>

        <SheetFooter className="flex-row gap-2 border-t border-border/30 pt-4">
          {step !== "coin" && step !== "results" && (
            <Button variant="outline" size="sm" onClick={goBack} className="gap-1.5">
              <ArrowLeft className="h-3.5 w-3.5" />
              Back
            </Button>
          )}
          {step === "results" && (
            <Button
              variant="outline"
              size="sm"
              onClick={resetAll}
              className="gap-1.5"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Retake Quiz
            </Button>
          )}
          {step !== "results" && (
            <Button
              size="sm"
              onClick={goNext}
              disabled={!canGoNext}
              className="ml-auto gap-1.5"
            >
              Next
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

/* ─── Step 1: Coin ─── */
function StepCoin({
  selected,
  onSelect,
}: {
  selected: CoinSymbol | null;
  onSelect: (coin: CoinSymbol) => void;
}) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-semibold">What coin do you want to mine?</h3>
        <p className="text-xs text-muted-foreground mt-1">
          All current miners use SHA-256. Scrypt miners coming soon.
        </p>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {ALL_COINS.map((symbol) => {
          const coin = COINS[symbol];
          const enabled = coin.enabled;
          const isSelected = selected === symbol;
          return (
            <button
              key={symbol}
              disabled={!enabled}
              onClick={() => onSelect(symbol)}
              className={`relative flex flex-col items-center gap-2 rounded-lg border p-4 transition-all ${
                isSelected
                  ? "border-primary bg-primary/10 ring-1 ring-primary"
                  : enabled
                    ? "border-border/40 bg-card hover:border-border hover:bg-accent/50"
                    : "border-border/30 bg-card/50 opacity-50 cursor-not-allowed"
              }`}
            >
              {!enabled && (
                <Badge
                  variant="secondary"
                  className="absolute top-1.5 right-1.5 text-[9px] px-1 py-0"
                >
                  Soon
                </Badge>
              )}
              <Image
                src={coin.icon}
                alt={coin.name}
                width={32}
                height={32}
                className={!enabled ? "grayscale" : ""}
              />
              <div className="text-center">
                <p className="text-xs font-medium">{coin.name}</p>
                <p className="text-[10px] text-muted-foreground">{coin.algorithm}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Step 2: Budget ─── */
const BUDGET_OPTIONS: {
  value: BudgetRange;
  label: string;
  desc: string;
}[] = [
  { value: "under-100", label: "Under $100", desc: "Entry-level desk miners" },
  { value: "100-200", label: "$100 – $200", desc: "Mid-range hobby miners" },
  { value: "200-400", label: "$200 – $400", desc: "Serious solo hardware" },
  { value: "400-plus", label: "$400+", desc: "Maximum hashrate rigs" },
];

function StepBudget({
  selected,
  onSelect,
}: {
  selected: BudgetRange | null;
  onSelect: (b: BudgetRange) => void;
}) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-semibold">What&apos;s your budget?</h3>
        <p className="text-xs text-muted-foreground mt-1">
          We&apos;ll match miners in or near your price range.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {BUDGET_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onSelect(opt.value)}
            className={`flex flex-col items-start gap-1 rounded-lg border p-4 text-left transition-all ${
              selected === opt.value
                ? "border-primary bg-primary/10 ring-1 ring-primary"
                : "border-border/40 bg-card hover:border-border hover:bg-accent/50"
            }`}
          >
            <span className="text-sm font-semibold">{opt.label}</span>
            <span className="text-[11px] text-muted-foreground">{opt.desc}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ─── Step 3: Environment ─── */
const ENV_OPTIONS: {
  value: Environment;
  label: string;
  desc: string;
  icon: React.ElementType;
}[] = [
  { value: "desktop", label: "Desktop / Office", desc: "Need it quiet", icon: Monitor },
  { value: "living-room", label: "Living Room", desc: "Must be near-silent", icon: Sofa },
  { value: "garage", label: "Garage / Closet", desc: "Noise doesn't matter", icon: Warehouse },
  { value: "dedicated", label: "Dedicated Space", desc: "Noise doesn't matter", icon: Server },
];

function StepEnvironment({
  selected,
  onSelect,
}: {
  selected: Environment | null;
  onSelect: (e: Environment) => void;
}) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-semibold">Where will you run it?</h3>
        <p className="text-xs text-muted-foreground mt-1">
          This helps us filter by noise level.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {ENV_OPTIONS.map((opt) => {
          const Icon = opt.icon;
          return (
            <button
              key={opt.value}
              onClick={() => onSelect(opt.value)}
              className={`flex flex-col items-start gap-2 rounded-lg border p-4 text-left transition-all ${
                selected === opt.value
                  ? "border-primary bg-primary/10 ring-1 ring-primary"
                  : "border-border/40 bg-card hover:border-border hover:bg-accent/50"
              }`}
            >
              <Icon className="h-5 w-5 text-primary/70" />
              <div>
                <span className="text-sm font-semibold block">{opt.label}</span>
                <span className="text-[11px] text-muted-foreground">
                  {opt.desc}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Step 4: Priority ─── */
const PRIORITY_OPTIONS: {
  value: Priority;
  label: string;
  desc: string;
  icon: React.ElementType;
}[] = [
  { value: "low-power", label: "Lowest Power", desc: "Minimize watts", icon: Zap },
  { value: "max-hashrate", label: "Max Hashrate", desc: "Most hashing power", icon: Cpu },
  { value: "best-value", label: "Best Value", desc: "Best TH/s per dollar", icon: TrendingUp },
  { value: "quietest", label: "Quietest", desc: "Silence is golden", icon: Wind },
];

function StepPriority({
  selected,
  onSelect,
}: {
  selected: Priority | null;
  onSelect: (p: Priority) => void;
}) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-semibold">What matters most?</h3>
        <p className="text-xs text-muted-foreground mt-1">
          We&apos;ll weight this as the biggest factor in our recommendation.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {PRIORITY_OPTIONS.map((opt) => {
          const Icon = opt.icon;
          return (
            <button
              key={opt.value}
              onClick={() => onSelect(opt.value)}
              className={`flex flex-col items-start gap-2 rounded-lg border p-4 text-left transition-all ${
                selected === opt.value
                  ? "border-primary bg-primary/10 ring-1 ring-primary"
                  : "border-border/40 bg-card hover:border-border hover:bg-accent/50"
              }`}
            >
              <Icon className="h-5 w-5 text-primary/70" />
              <div>
                <span className="text-sm font-semibold block">{opt.label}</span>
                <span className="text-[11px] text-muted-foreground">
                  {opt.desc}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Step 5: Results ─── */
function StepResults({
  results,
  coin,
}: {
  results: ScoredProduct[];
  coin: CoinSymbol | null;
}) {
  if (results.length === 0) {
    const coinName = coin ? COINS[coin]?.name : "that coin";
    const isScrypt = coin && COINS[coin]?.algorithm === "Scrypt";
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="rounded-full bg-muted/30 p-4 mb-4">
          <Cpu className="h-8 w-8 text-muted-foreground/40" />
        </div>
        <h3 className="font-heading font-medium">No miners found</h3>
        <p className="mt-1 text-sm text-muted-foreground max-w-xs">
          {isScrypt
            ? `No Scrypt miners available yet. We're working on adding ${coinName} miners soon.`
            : `No in-stock miners match ${coinName} right now. Check back soon.`}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-semibold">Your top picks</h3>
        <p className="text-xs text-muted-foreground mt-1">
          Ranked by how well they match your preferences.
        </p>
      </div>
      <div className="space-y-3">
        {results.map(({ product, score, matchReasons }, i) => {
          const effectivePrice =
            product.sale_price_cents ?? product.price_cents;
          return (
            <Link
              key={product.id}
              href={`/shop/${product.slug}`}
              className="group block"
            >
              <div className="relative rounded-lg border border-border/30 bg-card/50 p-4 transition-all hover:border-primary/30 hover:bg-card/80">
                {i === 0 && (
                  <Badge className="absolute -top-2 right-3 text-[10px]">
                    Best Match
                  </Badge>
                )}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                        {product.brand}
                      </span>
                      <Badge
                        variant="secondary"
                        className="text-[10px] px-1.5 py-0"
                      >
                        {score}% match
                      </Badge>
                    </div>
                    <h4 className="font-heading text-sm font-semibold leading-tight truncate">
                      {product.name}
                    </h4>
                    <div className="flex items-center gap-3 mt-1.5 text-xs text-muted-foreground">
                      <span>{formatHashrate(product.hashrate)}</span>
                      <span>&middot;</span>
                      <span>{formatWatts(product.power_watts)}</span>
                      <span>&middot;</span>
                      <span className="font-semibold text-foreground">
                        {formatPriceCents(effectivePrice)}
                      </span>
                    </div>
                    <ul className="mt-2 space-y-0.5">
                      {matchReasons.map((reason) => (
                        <li
                          key={reason}
                          className="text-[11px] text-muted-foreground flex items-start gap-1.5"
                        >
                          <span className="text-primary mt-0.5">&#x2713;</span>
                          {reason}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground/30 mt-2 shrink-0 transition-all group-hover:text-primary group-hover:translate-x-0.5" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
