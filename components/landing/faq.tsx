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
      "Solo mining means your miner works independently to find a block. Unlike pooled mining (PPLNS, PPS) where rewards are split among all participants, solo mining gives you the entire block reward when you find one. The trade-off is higher variance — you may wait longer between blocks, but each payout is the full reward.",
  },
  {
    question: "What equipment do I need?",
    answer:
      "You need an ASIC miner compatible with the algorithm of the coin you're mining. BTC, BCH, and DGB use SHA-256 ASICs (Antminer S19/S21, Whatsminer M50/M60). LTC and DOGE use Scrypt ASICs (Antminer L7/L9). GPUs are not competitive for these coins.",
  },
  {
    question: "How do payouts work?",
    answer:
      "When your miner solves a block, the block reward minus the 1% pool fee is sent directly to the wallet address you configured. There's no minimum payout threshold and no holding period — the reward arrives as soon as the network confirms the block.",
  },
  {
    question: "What's the pool fee?",
    answer:
      "1% flat on block rewards. If your miner finds a block worth 3.125 BTC, you receive ~3.09375 BTC. No fees are charged on failed attempts or while mining without finding a block.",
  },
  {
    question: "How do I connect my miner?",
    answer:
      "Set your miner's stratum URL to the appropriate endpoint (e.g. stratum+tcp://btc.bitmernsolo.com:3102 for BTC). Use your wallet address as the username and 'x' as the password. Pick the port closest to your hashrate for optimal VarDiff. Our Getting Started guide covers it step by step.",
  },
  {
    question: "Can I mine multiple coins?",
    answer:
      "Yes — you can run different miners on different coins simultaneously. Each coin has its own stratum endpoint. Your dashboard shows all workers across all coins in one place.",
  },
  {
    question: "What happens when a worker goes offline?",
    answer:
      "If you have alerts enabled, you'll get an email notification when a worker disconnects. You can configure the offline detection threshold (how many minutes before alerting) in your alert settings. Your balance and earnings history are preserved regardless.",
  },
];

export function FAQ() {
  return (
    <section id="faq">
      <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 sm:py-24">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          FAQ
        </h2>

        <Accordion type="single" collapsible className="mt-8">
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
