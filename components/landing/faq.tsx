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
      "Solo mining means your hardware works independently to find a block. Unlike shared pools where rewards are split among all participants, solo mining pays the entire block reward to you when your miner finds one. The trade-off is higher variance. You may wait longer between blocks, but each payout is the full reward.",
  },
  {
    question: "What equipment do I need?",
    answer:
      "You need an ASIC miner that supports the algorithm of the coin you want to mine. Bitcoin, Bitcoin Cash, and DigiByte use SHA-256 machines like the Antminer S19 or S21. Litecoin and Dogecoin use Scrypt machines like the Antminer L7 or L9. GPU mining is not competitive for any of these coins.",
  },
  {
    question: "How do payouts work?",
    answer:
      "When your miner solves a block, the reward (minus the 1% pool fee) is sent directly to the wallet address you set in your account. There is no minimum payout threshold and no holding period. The reward arrives as soon as the network confirms the block.",
  },
  {
    question: "What is the pool fee?",
    answer:
      "A flat 1% on block rewards. For example, if your miner finds a Bitcoin block worth 3.125 BTC, you receive approximately 3.094 BTC. No fees are charged while you mine without finding a block.",
  },
  {
    question: "How do I connect my miner?",
    answer:
      "Set your stratum URL to the endpoint for your coin (for example, stratum+tcp://btc.bitmernsolo.com:3102 for Bitcoin). Use your wallet address as the username and \"x\" as the password. Choose the port that best matches your hashrate for optimal difficulty. Our Getting Started guide walks through the full process.",
  },
  {
    question: "Can I mine multiple coins at the same time?",
    answer:
      "Yes. You can run different miners on different coins simultaneously. Each coin has its own stratum endpoint, and your dashboard shows all of your workers and earnings across every coin in one place.",
  },
  {
    question: "What happens if a worker goes offline?",
    answer:
      "If you have alerts enabled, you will receive an email as soon as a worker disconnects. You can set how long to wait before being notified in your alert settings. Your balance and earnings history are always preserved regardless of worker status.",
  },
];

export function FAQ() {
  return (
    <section id="faq">
      <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 sm:py-24">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Frequently asked questions
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
