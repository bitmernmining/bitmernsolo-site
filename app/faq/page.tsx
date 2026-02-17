import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "FAQ — Bitmern Solo",
  description:
    "Frequently asked questions about solo mining with Bitmern. Getting started, hardware, payouts, fees, account security, and troubleshooting.",
};

/* ── FAQ data ── */

interface FAQCategory {
  heading: string;
  items: { q: string; a: string }[];
}

const categories: FAQCategory[] = [
  {
    heading: "Getting Started",
    items: [
      {
        q: "What is solo mining?",
        a: "Solo mining means your hardware works independently to find a block. Unlike shared pools where rewards are split among all participants, solo mining pays the entire block reward to you when your miner finds one. The trade-off is higher variance — you may wait longer between blocks, but each payout is the full reward.",
      },
      {
        q: "How do I create an account?",
        a: "Sign up at app.bitmernsolo.com with just an email address. No KYC, no identity verification, and no personal information required beyond your email. Your account is ready in seconds.",
      },
      {
        q: "What do I need to get started?",
        a: "Three things: an account on Bitmern Solo, a wallet address for the coin you want to mine (where you control the private keys), and an ASIC miner that supports the coin's algorithm. SHA-256 ASICs for BTC, BCH, and DGB. Scrypt ASICs for LTC and DOGE.",
      },
      {
        q: "How do I connect my miner?",
        a: "Set your stratum URL to the endpoint for your coin (for example, stratum+tcp://btc.bitmernsolo.com:3102 for Bitcoin). Use your wallet address as the username and \"x\" as the password. Choose the port that best matches your hashrate for optimal difficulty. Our Getting Started guide walks through the full process.",
      },
      {
        q: "What coins can I mine?",
        a: "Bitmern Solo supports five coins: Bitcoin (BTC), Litecoin (LTC), Dogecoin (DOGE), Bitcoin Cash (BCH), and DigiByte (DGB). BTC, BCH, and DGB use SHA-256 ASICs. LTC and DOGE use Scrypt ASICs.",
      },
      {
        q: "Can I mine multiple coins at the same time?",
        a: "Yes. You can run different miners on different coins simultaneously. Each coin has its own stratum endpoint and pool. Your dashboard shows all of your workers and earnings across every coin in one place.",
      },
    ],
  },
  {
    heading: "Mining & Hardware",
    items: [
      {
        q: "What equipment do I need?",
        a: "You need an ASIC miner that supports the algorithm of the coin you want to mine. Bitcoin, Bitcoin Cash, and DigiByte use SHA-256 machines like the Antminer S19, S21, or Whatsminer M50/M60 series. Litecoin and Dogecoin use Scrypt machines like the Antminer L7, L9, or Elphapex DG1+. GPU mining is not competitive for any of these coins.",
      },
      {
        q: "Can I mine with a GPU or CPU?",
        a: "Technically you can connect any stratum-compatible miner, but GPUs and CPUs are orders of magnitude slower than ASICs for SHA-256 and Scrypt. Your chance of finding a block would be effectively zero. ASIC hardware is required for any realistic chance.",
      },
      {
        q: "What about Bitaxe and other small miners?",
        a: "Bitaxe and similar open-source solo mining hardware work great with Bitmern Solo. They produce around 1–4 TH/s, which makes finding a BTC block extremely unlikely but not impossible. Many miners run these as lottery-ticket hardware. They are more practical for lower-difficulty coins like BCH or DGB.",
      },
      {
        q: "How do I choose the right port?",
        a: "Each coin has multiple stratum ports with different starting difficulties. Higher-difficulty ports are better for powerful ASICs (fewer initial low-diff shares), while lower-difficulty ports are better for smaller hardware. VarDiff automatically adjusts after connection, so the starting port mainly affects the first few minutes. When in doubt, use the default (highest) port.",
      },
      {
        q: "What is VarDiff?",
        a: "VarDiff (Variable Difficulty) automatically adjusts the share difficulty sent to your miner based on how fast it's hashing. This keeps your miner submitting shares at a steady, optimal rate. You don't need to configure anything — it happens automatically on our end.",
      },
      {
        q: "What is hashrate and why does it matter?",
        a: "Hashrate measures how many hash computations your miner performs per second. Higher hashrate means more chances of finding a valid block per unit of time. In solo mining, your chance of finding a block is roughly your hashrate divided by the total network hashrate.",
      },
    ],
  },
  {
    heading: "Payouts & Fees",
    items: [
      {
        q: "How do payouts work?",
        a: "When your miner solves a block, the reward (minus the 1% pool fee) is sent directly to the wallet address you set in your account. There is no minimum payout threshold and no holding period. The reward arrives as soon as the network confirms the block and the coinbase reward matures.",
      },
      {
        q: "What is the pool fee?",
        a: "A flat 1% on block rewards. For example, if your miner finds a Bitcoin block worth 3.125 BTC, you receive approximately 3.094 BTC. No fees are charged while you mine without finding a block. You only pay when you earn.",
      },
      {
        q: "How long until I find a block?",
        a: "It depends on your hashrate relative to the network. Solo mining is probabilistic — like a lottery. A 200 TH/s Bitcoin miner might statistically expect one block every several years, but could get lucky sooner or wait longer. Coins with lower network difficulty (BCH, DGB, DOGE) have better odds. Use the calculator in your dashboard to estimate.",
      },
      {
        q: "Why hasn't my payout arrived yet?",
        a: "Block rewards require network confirmations before they mature and become spendable. Bitcoin requires 100 confirmations (~16 hours). Other coins require fewer. Once mature, the payout is processed automatically. Check the payouts page in your dashboard for status.",
      },
      {
        q: "Do I need a minimum balance to get paid?",
        a: "No. There is no minimum payout threshold. When you find a block, the full reward (minus the 1% fee) is sent to your wallet after the required confirmations.",
      },
    ],
  },
  {
    heading: "Account & Security",
    items: [
      {
        q: "Is my wallet address safe?",
        a: "Wallet addresses are public by design — they are visible on the blockchain whenever you receive a transaction. We store your address to direct block rewards. We never have access to your private keys or the ability to move funds from your wallet.",
      },
      {
        q: "Can I change my wallet address?",
        a: "Yes. Update your wallet address in the Settings page of your dashboard at any time. The new address will be used for any future block rewards. Past payouts that have already been sent to the old address cannot be redirected.",
      },
      {
        q: "What data do you collect?",
        a: "We collect your email address (for login and alerts), wallet addresses (for payouts), and mining data (hashrate, shares, worker names) from your connected miners. We do not require or collect personal identification information.",
      },
      {
        q: "What happens to my earnings if I lose access to my account?",
        a: "Any payouts already sent to your wallet are yours — they are on the blockchain and controlled by your private keys. If you lose account access, use the password reset flow. Your mining history and configuration are tied to your account.",
      },
    ],
  },
  {
    heading: "Troubleshooting",
    items: [
      {
        q: "My miner is connected but I don't see hashrate in the dashboard",
        a: "It can take 2–5 minutes for hashrate to appear after connecting. The pool needs to receive enough shares to calculate a reliable hashrate estimate. If it still doesn't appear after 10 minutes, verify your stratum URL, wallet address, and port are correct.",
      },
      {
        q: "What happens if a worker goes offline?",
        a: "If you have alerts enabled, you will receive an email as soon as a worker disconnects (after your configured delay). Your balance and earnings history are always preserved regardless of worker status. Simply reconnect when ready.",
      },
      {
        q: "My hashrate in the dashboard is lower than what my miner reports",
        a: "The dashboard calculates hashrate from submitted shares, which fluctuates naturally. It's normal for the pool-reported hashrate to be 5–15% different from your miner's reported hashrate. Over time, the average should be close. Significant discrepancies may indicate network issues or rejected shares.",
      },
      {
        q: "I'm getting rejected shares — what should I try?",
        a: "Rejected shares are usually caused by stale work (your miner submitted a share after a new block was found) or network latency. Try a port with a lower starting difficulty, check your internet connection stability, and ensure your miner firmware is up to date. A small rejection rate (under 2%) is normal.",
      },
    ],
  },
];

/* ── Page ── */

export default function FAQPage() {
  let faqIndex = 0;

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
      {/* Header */}
      <div className="text-center mb-16">
        <h1
          className="font-bold tracking-tight"
          style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
        >
          Frequently asked questions
        </h1>
        <p className="mt-3 mx-auto max-w-xl text-muted-foreground leading-relaxed">
          Everything you need to know about solo mining with Bitmern. Can&apos;t
          find what you&apos;re looking for?{" "}
          <Link href="/contact" className="text-primary hover:underline">
            Contact us
          </Link>
          .
        </p>
      </div>

      {/* ── FAQ categories ── */}
      <div className="space-y-12 mb-16">
        {categories.map((cat) => (
          <div key={cat.heading}>
            <h2 className="text-lg font-bold tracking-tight mb-4">
              {cat.heading}
            </h2>
            <Accordion type="single" collapsible>
              {cat.items.map((item) => {
                const value = `faq-${faqIndex++}`;
                return (
                  <AccordionItem key={value} value={value}>
                    <AccordionTrigger className="text-left text-sm font-medium">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </div>
        ))}
      </div>

      {/* ── CTA ── */}
      <div className="text-center rounded-xl border border-primary/20 bg-primary/5 p-8">
        <h2 className="text-2xl font-bold tracking-tight">Still have questions?</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Reach out to our team or check the Getting Started guide for a
          step-by-step walkthrough.
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <Button size="lg" className="glow" asChild>
            <a href="https://app.bitmernsolo.com/signup">
              Start Mining
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/contact">
              Contact Us
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
