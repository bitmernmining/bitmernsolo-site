import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { COINS, STRATUM } from "@/lib/data";
import { DocsSidebar } from "@/components/docs/docs-sidebar";

export const metadata: Metadata = {
  title: "Documentation — Bitmern Solo",
  description:
    "Complete documentation for Bitmern Solo mining pool. Supported coins, stratum endpoints, worker configuration, public API reference, fee structure, and more.",
};

/* ── Static data ── */

const API_BASE = "http://api.bitmernsolo.com";

const POOL_IDS = [
  { coin: "Bitcoin", id: "bitcoin-solo" },
  { coin: "Litecoin", id: "litecoin-solo" },
  { coin: "Dogecoin", id: "dogecoin-solo" },
  { coin: "Bitcoin Cash", id: "bitcoincash-solo" },
  { coin: "DigiByte", id: "digibyte-solo" },
  { coin: "eCash", id: "ecash-solo" },
  { coin: "Ethereum Classic", id: "ethereumclassic-solo" },
  { coin: "Zcash", id: "zcash-solo" },
  { coin: "Monero", id: "monero-solo" },
  { coin: "Ravencoin", id: "ravencoin-solo" },
];
