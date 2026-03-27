import Link from "next/link";
import { ArrowRight, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
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
      "Solo mining means your hardware works independently to find a block. Unlike shared pools where rewards are split among all participants, solo mining pays the entire block reward to you when your miner finds one. The trade-off is higher variance \u2014 you may wait longer between blocks, but each payout is the full reward.",
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
    <section id="faq" className="relative">
      <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 sm:py-24">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center rounded-full bg-primary/10 p-2.5 mb-4">
            <HelpCircle className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Frequently asked questions
          </h2>
          <p className="mt-3 mx-auto max-w-xl text-muted-foreground">
            Everything you need to know about solo mining with Bitmern.
            Can&apos;t find what you&apos;re looking for?{" "}
            <Link href="/contact" className="text-primary hover:underline">
              Get in touch
            </Link>
            .
          </p>
        </div>

        {/* FAQ accordion in a card container */}
        <div className="rounded-xl border border-border/40 bg-card/50 backdrop-blur-sm overflow-hidden">
          <Accordion type="single" collapsible>
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="border-border/30 px-6 transition-colors data-[state=open]:bg-primary/[0.03]"
              >
                <AccordionTrigger className="text-left text-[15px] font-medium hover:no-underline hover:text-primary py-5 cursor-pointer">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <Link
            href="/faq"
            className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
          >
            View all FAQs
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <Button variant="outline" size="sm" asChild>
            <Link href="/contact">
              Still have questions? Contact us
              <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
