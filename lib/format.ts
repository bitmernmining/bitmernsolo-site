const HASH_UNITS = ["H/s", "KH/s", "MH/s", "GH/s", "TH/s", "PH/s", "EH/s"];

export function formatHashrate(hashesPerSecond: number): string {
  if (hashesPerSecond === 0) return "0 H/s";
  let unitIndex = 0;
  let value = hashesPerSecond;
  while (value >= 1000 && unitIndex < HASH_UNITS.length - 1) {
    value /= 1000;
    unitIndex++;
  }
  return `${value.toFixed(2)} ${HASH_UNITS[unitIndex]}`;
}

export function formatHashrateCompact(hashesPerSecond: number): { value: string; unit: string } {
  if (hashesPerSecond === 0) return { value: "0", unit: "H/s" };
  let unitIndex = 0;
  let value = hashesPerSecond;
  while (value >= 1000 && unitIndex < HASH_UNITS.length - 1) {
    value /= 1000;
    unitIndex++;
  }
  return { value: value.toFixed(2), unit: HASH_UNITS[unitIndex] };
}

export function formatBtcAmount(amount: number, decimals = 8): string {
  return amount.toFixed(decimals);
}

export function formatUsd(amount: number): string {
  const abs = Math.abs(amount);
  const maxDecimals = abs > 0 && abs < 0.01 ? 4 : 2;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: maxDecimals,
  }).format(amount);
}

export function formatNumber(num: number, decimals = 0): string {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(num);
}

export function formatCompactNumber(num: number): string {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 2,
  }).format(num);
}

export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffSec < 60) return `${diffSec}s ago`;
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHour < 24) return `${diffHour}h ago`;
  if (diffDay < 30) return `${diffDay}d ago`;
  return date.toLocaleDateString();
}

export function formatDifficulty(difficulty: number): string {
  if (difficulty >= 1e12) return `${(difficulty / 1e12).toFixed(2)}T`;
  if (difficulty >= 1e9) return `${(difficulty / 1e9).toFixed(2)}B`;
  if (difficulty >= 1e6) return `${(difficulty / 1e6).toFixed(2)}M`;
  if (difficulty >= 1e3) return `${(difficulty / 1e3).toFixed(2)}K`;
  return difficulty.toFixed(2);
}

export function formatPercent(value: number, decimals = 2): string {
  return `${value.toFixed(decimals)}%`;
}

export function formatUptime(seconds: number): string {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  if (days > 0) return `${days}d ${hours}h`;
  const minutes = Math.floor((seconds % 3600) / 60);
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
}

export function truncateAddress(address: string, start = 8, end = 6): string {
  if (address.length <= start + end) return address;
  return `${address.slice(0, start)}...${address.slice(-end)}`;
}

export function formatPriceCents(cents: number): string {
  return formatUsd(cents / 100);
}

export function formatOrderNumber(id: string): string {
  if (id.startsWith("ord-")) return id.replace("ord-", "#ORD-").toUpperCase();
  return `#${id.slice(0, 8).toUpperCase()}`;
}

export function formatWatts(watts: number): string {
  return `${formatNumber(watts)}W`;
}

export function formatEfficiency(hashrate: number, powerWatts: number, algorithm: string): string {
  if (hashrate === 0) return "N/A";
  if (algorithm === "Scrypt") {
    const jPerGh = powerWatts / (hashrate / 1e9);
    return `${jPerGh.toFixed(1)} J/GH`;
  }
  const jPerTh = powerWatts / (hashrate / 1e12);
  return `${jPerTh.toFixed(1)} J/TH`;
}
