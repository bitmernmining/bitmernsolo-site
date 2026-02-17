import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is solo mining?",
    answer:
      "Solo mining means your miner works independently to find a block. Unlike pooled mining where rewards are split among participants, solo mining gives you the entire block reward when you find one. The trade-off is higher variance — you may wait longer between rewards, but each reward is much larger.",
  },
  {
    question: "What equipment do I need?",
    answer:
      "You need an ASIC miner compatible with the algorithm of the coin you want to mine. For BTC and BCH, that means a SHA-256 ASIC (like Antminer S19 or S21). For LTC and DOGE, you need a Scrypt ASIC (like Antminer L7 or L9). DGB also uses SHA-256. Consumer GPUs are not suitable for these coins.",
  },
  {
    question: "How do payouts work?",
    answer:
      "When your miner solves a block, the full block reward (minus the network transaction fee) is sent directly to the wallet address you configured. There's no minimum payout threshold and no pool fee — you receive the reward as soon as the network confirms the block.",
  },
  {
    question: "Is there really no pool fee?",
    answer:
      "Correct — Bitmern Solo charges 0% in pool fees. You keep 100% of the block reward. We sustain the service through optional premium features and donations.",
  },
  {
    question: "How do I connect my miner?",
    answer:
      "Point your miner's stratum URL to the appropriate endpoint (e.g., stratum+tcp://btc.bitmernsolo.com:3102 for BTC). Use your wallet address as the username and any value as the password. Our Getting Started guide walks you through it step by step.",
  },
  {
    question: "Can I mine multiple coins at once?",
    answer:
      "You can mine different coins with different miners simultaneously, but a single miner can only mine one coin at a time. Our dashboard lets you monitor all your miners across all coins from a single view.",
  },
  {
    question: "What happens if my miner disconnects?",
    answer:
      "If you have alerts enabled, you'll receive an email notification when a worker goes offline. You can configure offline detection thresholds in your alert settings. Your pending balance and earnings history are preserved regardless of connection status.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="border-t border-border/40 bg-card/30">
      <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 sm:py-24">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Frequently asked questions
          </h2>
          <p className="mt-4 text-muted-foreground">
            Everything you need to know about solo mining with Bitmern.
          </p>
        </div>

        <Accordion type="single" collapsible className="mt-12">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`}>
              <AccordionTrigger className="text-left text-sm font-medium">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
