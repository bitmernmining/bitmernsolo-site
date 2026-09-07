import { SectionHeading, CodeBlock } from "@/components/docs/docs-ui";
import Image from "next/image";
import { STRATUM } from "@/lib/data";

export function DocsStratum() {
  return (
<section>
            <SectionHeading id="stratum">Stratum Endpoints</SectionHeading>
            <p className="mt-4 text-sm text-muted-foreground mb-6">
              Point your miner at the endpoint for your coin. All ports use{" "}
              <strong className="text-foreground">VarDiff</strong> — the number
              shown is the starting difficulty.
            </p>

            <div className="space-y-4">
              {STRATUM.map((s) => (
                <div key={s.coin} className="rounded-lg border border-border/40 overflow-hidden">
                  <div className="flex items-center gap-2.5 border-b border-border/40 bg-secondary/20 px-4 py-2.5">
                    <Image src={s.icon} alt={s.name} width={18} height={18} />
                    <span className="text-sm font-semibold">{s.name}</span>
                    <span className="font-mono text-[11px] text-muted-foreground">{s.algo}</span>
                  </div>
                  <div className="p-3 space-y-1.5">
                    {s.ports.map((p, i) => (
                      <div
                        key={p.port}
                        className={`flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 rounded-md px-3 py-2 ${
                          i === 0 ? "bg-primary/10 border border-primary/20" : "bg-secondary/30"
                        }`}
                      >
                        <code className="font-mono text-[13px] font-medium shrink-0">{s.host}:{p.port}</code>
                        <div className="flex items-center gap-2">
                          <span className="rounded bg-secondary px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">VarDiff {p.diff}</span>
                          <span className="text-xs text-muted-foreground">{p.label}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <h3 className="mt-8 text-sm font-semibold mb-3">Credentials</h3>
            <CodeBlock label="Miner configuration">{`Username:  YOUR_WALLET_ADDRESS.workerName
Password:  x`}</CodeBlock>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              The part after the dot is your worker name — use any label you want
              (e.g. <code className="rounded bg-secondary/80 px-1.5 py-0.5 text-xs text-foreground">antminer-s21</code>,{" "}
              <code className="rounded bg-secondary/80 px-1.5 py-0.5 text-xs text-foreground">garage-rig</code>). Password can be anything.
            </p>

            <h3 className="mt-8 text-sm font-semibold mb-3">Configuration examples</h3>
            <div className="space-y-4">
              <CodeBlock label="Miner web interface / software (ASIC, GPU, or CPU)">{`Pool URL:  stratum+tcp://btc.bitmernsolo.com:3102
Worker:    YOUR_WALLET_ADDRESS.worker1
Password:  x`}</CodeBlock>

              <CodeBlock label="CGMiner / BFGMiner (command line)">{`cgminer -o stratum+tcp://btc.bitmernsolo.com:3102 \\
  -u YOUR_WALLET_ADDRESS.worker1 \\
  -p x`}</CodeBlock>
            </div>
          </section>
  );
}
