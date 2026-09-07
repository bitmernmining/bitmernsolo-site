export const API_BASE = "http://api.bitmernsolo.com";

export const API_ENDPOINTS = [
  {
    method: "GET",
    path: "/api/pools",
    description: "List all available pools with basic configuration.",
    example: `curl ${API_BASE}/api/pools`,
    response: `{ "pools": [ { "id": "bitcoin-solo", "coin": { "type": "BTC", "name": "Bitcoin", "symbol": "BTC", "algorithm": "Sha256D" }, "...": "..." }, "..." ] }`,
  },
  {
    method: "GET",
    path: "/api/pools/{id}",
    description:
      "Detailed stats for a specific pool — hashrate, connected miners, network difficulty, and available ports.",
    example: `curl ${API_BASE}/api/pools/bitcoin-solo`,
    response: `{ "pool": { "id": "bitcoin-solo", "coin": { "type": "BTC", "symbol": "BTC", "algorithm": "Sha256D" }, "ports": { "3102": { "difficulty": 25000, "varDiff": { "...": "..." } } }, "poolStats": { "...": "..." }, "networkStats": { "...": "..." } } }`,
  },
  {
    method: "GET",
    path: "/api/pools/{id}/performance",
    description: "Pool-level hashrate history. Returns hourly samples.",
    example: `curl ${API_BASE}/api/pools/bitcoin-solo/performance`,
    response: `{ "stats": [ { "poolHashrate": 0, "connectedMiners": 0, "created": "..." }, "..." ] }`,
  },
  {
    method: "GET",
    path: "/api/pools/{id}/blocks",
    description: "Blocks found by the pool, newest first. Returns an empty array if no blocks found yet.",
    example: `curl ${API_BASE}/api/pools/bitcoin-solo/blocks`,
    response: `[ { "blockHeight": 0, "status": "confirmed", "reward": 3.125, "miner": "bc1q...", "created": "..." }, "..." ]`,
  },
  {
    method: "GET",
    path: "/api/pools/{id}/miners/{address}",
    description:
      "Stats for a specific miner — pending shares, balance, effort, per-worker performance snapshot, and hourly performance samples.",
    example: `curl ${API_BASE}/api/pools/bitcoin-solo/miners/bc1qexample...`,
    response: `{ "pendingShares": 0, "pendingBalance": 0, "totalPaid": 0, "performance": { "workers": { "...": "..." } }, "performanceSamples": ["..."] }`,
  },
  {
    method: "GET",
    path: "/api/pools/{id}/miners/{address}/performance",
    description:
      "Miner hashrate history with per-worker breakdown. Hourly samples returned as an array.",
    example: `curl ${API_BASE}/api/pools/bitcoin-solo/miners/bc1qexample.../performance`,
    response: `[ { "created": "...", "workers": { "worker1": { "hashrate": 0, "sharesPerSecond": 0 } } }, "..." ]`,
  },
  {
    method: "GET",
    path: "/api/pools/{id}/miners/{address}/payments",
    description: "Payment history for a miner address. Returns an empty array if no payments yet.",
    example: `curl ${API_BASE}/api/pools/bitcoin-solo/miners/bc1qexample.../payments`,
    response: `[ { "coin": "BTC", "address": "bc1q...", "amount": 3.09375, "created": "..." }, "..." ]`,
  },
  {
    method: "GET",
    path: "/api/pools/{id}/miners/{address}/earnings/daily",
    description: "Daily earnings breakdown for a miner address. Returns an empty array if no earnings yet.",
    example: `curl ${API_BASE}/api/pools/bitcoin-solo/miners/bc1qexample.../earnings/daily`,
    response: `[ { "date": "2026-02-17", "amount": 0.0, "status": "pending" }, "..." ]`,
  },
];
