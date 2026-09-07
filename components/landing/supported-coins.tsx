import Image from "next/image";
import { STRATUM } from "@/lib/data";

export function SupportedCoins() {
  return (
    <section id="coins" className="relative section-elevated">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Supported coins
        </h2>
        <p className="mt-2 text-muted-foreground">
          Each coin has its own stratum endpoint and a range of VarDiff ports to match your hardware.
        </p>

        <div className="mt-12 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border/40 text-xs text-muted-foreground">
                <th className="pb-3 pr-6 font-medium">Coin</th>
                <th className="pb-3 pr-6 font-medium">Algorithm</th>
                <th className="pb-3 pr-6 font-medium">Stratum Host</th>
                <th className="pb-3 font-medium">Ports</th>
              </tr>
            </thead>
            <tbody>
              {STRATUM.map((coin) => (
                <tr
                  key={coin.coin}
                  className="border-b border-border/20 transition-colors hover:bg-card/30"
                >
                  <td className="py-4 pr-6">
                    <div className="flex items-center gap-3">
                      <Image
                        src={coin.icon}
                        alt={coin.name}
                        width={28}
                        height={28}
                        className="h-7 w-7"
                      />
                      <div>
                        <span className="font-medium">{coin.name}</span>
                        <span className="ml-2 text-xs text-muted-foreground">{coin.coin}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 pr-6 font-mono text-xs text-muted-foreground">{coin.algo}</td>
                  <td className="py-4 pr-6 font-mono text-xs text-primary">
                    {coin.host.replace(/^stratum\+tcp:\/\//, "")}
                  </td>
                  <td className="py-4 font-mono text-xs text-muted-foreground">
                    {coin.ports.map((p) => p.port).join(", ")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
