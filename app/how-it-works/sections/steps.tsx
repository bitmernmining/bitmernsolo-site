import { UserPlus, Wallet, Cpu, Share2, Box, BadgeDollarSign } from "lucide-react";

const steps = [
  {
    n: 1,
    icon: UserPlus,
    title: "Create your account",
    desc: "Sign up with just an email address. No KYC, no identity verification, no waiting period. Your account is ready in seconds.",
  },
  {
    n: 2,
    icon: Wallet,
    title: "Set up your wallet",
    desc: "Add a wallet address for each coin you want to mine. You must use a wallet where you control the private keys — never an exchange address. When your miner finds a block, the reward goes directly to this address.",
  },
  {
    n: 3,
    icon: Cpu,
    title: "Configure your miner",
    desc: "Point your ASIC at the stratum endpoint for your coin. Use your wallet address as the username and any value as the password. The part after the dot in your username is your worker name — use it to identify different machines.",
  },
  {
    n: 4,
    icon: Share2,
    title: "Submitting shares",
    desc: "Once connected, your miner starts hashing and submitting shares. Shares are proof that your hardware is working. The pool uses them to estimate your hashrate and track your contribution. VarDiff automatically adjusts share difficulty to keep submissions at an optimal rate.",
  },
  {
    n: 5,
    icon: Box,
    title: "Finding a block",
    desc: "Every share has a chance of being a valid block. When one of your shares meets the full network difficulty, your miner has found a block. The pool immediately broadcasts it to the network. After enough confirmations, the block reward matures.",
  },
  {
    n: 6,
    icon: BadgeDollarSign,
    title: "Getting paid",
    desc: "Since this is a solo pool, the entire block reward (minus our 1% fee) goes to your wallet. No splitting with other miners, no minimum payout threshold, no holding period. The reward is yours as soon as the network confirms the block.",
  },
];

export function HiwSteps() {
  return (
    <div className="space-y-6 mb-16">
      <h2 className="text-2xl font-bold tracking-tight">Six steps to your first block</h2>
      <div className="space-y-4">
        {steps.map((step) => {
          const Icon = step.icon;
          return (
            <div
              key={step.n}
              className="flex gap-4 rounded-xl border border-border/40 bg-card p-5"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border/40 bg-background/50">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary">
                    {step.n}
                  </span>
                  <h3 className="text-sm font-semibold">{step.title}</h3>
                </div>
                <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
