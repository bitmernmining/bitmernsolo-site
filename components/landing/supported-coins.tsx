import { Badge } from "@/components/ui/badge";

const coins = [
  {
    symbol: "BTC",
    name: "Bitcoin",
    algorithm: "SHA-256",
    color: "oklch(0.75 0.15 75)",
    ports: "3102, 3112, 3122, 3132",
  },
  {
    symbol: "LTC",
    name: "Litecoin",
    algorithm: "Scrypt",
    color: "oklch(0.65 0.05 250)",
    ports: "3032, 3042, 3052",
  },
  {
    symbol: "DOGE",
    name: "Dogecoin",
    algorithm: "Scrypt",
    color: "oklch(0.75 0.12 85)",
    ports: "3062, 3072",
  },
  {
    symbol: "BCH",
    name: "Bitcoin Cash",
    algorithm: "SHA-256",
    color: "oklch(0.65 0.2 145)",
    ports: "13103, 13113, 13123",
  },
  {
    symbol: "DGB",
    name: "DigiByte",
    algorithm: "SHA-256",
    color: "oklch(0.6 0.18 260)",
    ports: "3082, 3092",
  },
];

export function SupportedCoins() {
  return (
    <section id="coins">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            5 coins, one dashboard
          </h2>
          <p className="mt-4 text-muted-foreground">
            Switch between coins instantly. Each with dedicated stratum endpoints and VarDiff ports.
          </p>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {coins.map((coin) => (
            <div
              key={coin.symbol}
              className="group relative rounded-xl border border-border/40 bg-card/60 p-5 text-center transition-all hover:border-primary/30 hover:bg-card"
            >
              {/* Coin icon circle */}
              <div
                className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold"
                style={{
                  backgroundColor: `color-mix(in oklch, ${coin.color} 15%, transparent)`,
                  color: coin.color,
                }}
              >
                {coin.symbol.charAt(0)}
              </div>
              <h3 className="text-sm font-semibold">{coin.name}</h3>
              <p className="mt-0.5 font-mono text-xs text-muted-foreground">{coin.symbol}</p>
              <Badge variant="secondary" className="mt-3 text-[10px]">
                {coin.algorithm}
              </Badge>
              <p className="mt-2 font-mono text-[10px] text-muted-foreground">
                Ports: {coin.ports}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
