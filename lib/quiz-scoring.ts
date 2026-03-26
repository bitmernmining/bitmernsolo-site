import type { Product } from "@/types/shop";
import type { CoinSymbol } from "@/types/coin";

export type BudgetRange = "under-100" | "100-200" | "200-400" | "400-plus";
export type Environment = "desktop" | "living-room" | "garage" | "dedicated";
export type Priority = "low-power" | "max-hashrate" | "best-value" | "quietest";

export interface QuizAnswers {
  coin: CoinSymbol;
  budget: BudgetRange;
  environment: Environment;
  priority: Priority;
}

export interface ScoredProduct {
  product: Product;
  score: number;
  matchReasons: string[];
}

const BUDGET_RANGES: Record<BudgetRange, { min: number; max: number }> = {
  "under-100": { min: 0, max: 10000 },
  "100-200": { min: 10000, max: 20000 },
  "200-400": { min: 20000, max: 40000 },
  "400-plus": { min: 40000, max: Infinity },
};

const BUDGET_ORDER: BudgetRange[] = [
  "under-100",
  "100-200",
  "200-400",
  "400-plus",
];

const ENV_MAX_DB: Record<Environment, number> = {
  desktop: 40,
  "living-room": 35,
  garage: 50,
  dedicated: 50,
};

function getEffectivePrice(product: Product): number {
  return product.sale_price_cents ?? product.price_cents;
}

function isWithinBudgetReach(product: Product, budget: BudgetRange): boolean {
  const price = getEffectivePrice(product);
  const idx = BUDGET_ORDER.indexOf(budget);

  const range = BUDGET_RANGES[budget];
  if (price >= range.min && price <= range.max) return true;

  for (const offset of [-1, 1]) {
    const adjIdx = idx + offset;
    if (adjIdx >= 0 && adjIdx < BUDGET_ORDER.length) {
      const adj = BUDGET_RANGES[BUDGET_ORDER[adjIdx]];
      if (price >= adj.min && price <= adj.max) return true;
    }
  }

  return false;
}

function scoreBudget(product: Product, budget: BudgetRange): number {
  const price = getEffectivePrice(product);
  const range = BUDGET_RANGES[budget];

  if (price >= range.min && price <= range.max) return 30;
  return 15;
}

function scoreNoise(product: Product, environment: Environment): number {
  const maxDb = ENV_MAX_DB[environment];
  const noiseDb = product.specs.noise_db ?? 40;
  const diff = noiseDb - maxDb;

  if (diff <= 0) return 25;
  if (diff <= 5) return 15;
  if (diff <= 10) return 5;
  return 0;
}

function scorePriority(
  product: Product,
  priority: Priority,
  allProducts: Product[]
): { score: number; reason: string | null } {
  if (allProducts.length <= 1) return { score: 45, reason: null };

  let getValue: (p: Product) => number;
  let reason: string | null = null;

  switch (priority) {
    case "low-power":
      getValue = (p) => -p.power_watts;
      break;
    case "max-hashrate":
      getValue = (p) => p.hashrate;
      break;
    case "best-value":
      getValue = (p) => {
        const price = getEffectivePrice(p);
        return price > 0 ? p.hashrate / price : 0;
      };
      break;
    case "quietest":
      getValue = (p) => -(p.specs.noise_db ?? 40);
      break;
  }

  const values = allProducts.map(getValue);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min;

  const productValue = getValue(product);
  const normalized = range === 0 ? 1 : (productValue - min) / range;
  const score = Math.round(normalized * 45);

  if (normalized >= 0.8) {
    switch (priority) {
      case "low-power":
        reason = `Only ${product.power_watts}W power draw`;
        break;
      case "max-hashrate":
        reason = "Highest hashrate in your range";
        break;
      case "best-value":
        reason = "Best hashrate per dollar";
        break;
      case "quietest":
        reason = `Only ${product.specs.noise_db ?? 40} dB`;
        break;
    }
  }

  return { score, reason };
}

function buildReasons(
  product: Product,
  answers: QuizAnswers,
  budgetScore: number,
  noiseScore: number,
  priorityReason: string | null
): string[] {
  const reasons: string[] = [];

  if (budgetScore >= 30) {
    reasons.push("Within your budget");
  }

  if (noiseScore >= 25) {
    const db = product.specs.noise_db ?? 40;
    reasons.push(`Only ${db} dB — quiet enough for your space`);
  }

  if (priorityReason) {
    reasons.push(priorityReason);
  }

  if (reasons.length === 0) {
    reasons.push(`${product.brand} ${product.algorithm} miner`);
  }

  return reasons.slice(0, 3);
}

export function scoreProducts(
  products: Product[],
  answers: QuizAnswers
): ScoredProduct[] {
  const eligible = products.filter(
    (p) =>
      p.coin_compatible.includes(answers.coin) &&
      p.stock_count > 0 &&
      isWithinBudgetReach(p, answers.budget)
  );

  if (eligible.length === 0) return [];

  const scored = eligible.map((product) => {
    const budgetScore = scoreBudget(product, answers.budget);
    const noiseScore = scoreNoise(product, answers.environment);
    const { score: priorityScore, reason: priorityReason } = scorePriority(
      product,
      answers.priority,
      eligible
    );

    const totalScore = Math.min(100, budgetScore + noiseScore + priorityScore);
    const matchReasons = buildReasons(
      product,
      answers,
      budgetScore,
      noiseScore,
      priorityReason
    );

    return { product, score: totalScore, matchReasons };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored;
}
