export interface NavLink {
  label: string;
  href: string;
  icon?: string;
  external?: boolean;
  description?: string;
}

export const dropdownColumns: { heading: string; links: NavLink[] }[] = [
  {
    heading: "Get Started",
    links: [
      { label: "Getting Started", href: "/getting-started", description: "Step-by-step setup guide" },
      { label: "Recommended Miners", href: "/miners", description: "Hardware for every budget" },
      {
        label: "Calculator",
        href: "https://app.bitmernsolo.com/calculator",
        external: true,
        description: "Estimate your mining odds",
      },
    ],
  },
  {
    heading: "Pool",
    links: [
      { label: "Pool Stats", href: "/pool-stats", description: "Live hashrate & network data" },
      { label: "Blocks Found", href: "/blocks", description: "Explorer-verified block finds" },
      { label: "How It Works", href: "/how-it-works", description: "Solo mining explained" },
      { label: "FAQ", href: "/faq", description: "Common questions answered" },
      { label: "Pricing", href: "/pricing", description: "Simple 1% fee on blocks" },
    ],
  },
  {
    heading: "Coins",
    links: [
      { label: "Bitcoin", href: "/coins/btc", icon: "/coins/btc.svg" },
      { label: "Litecoin", href: "/coins/ltc", icon: "/coins/ltc.svg" },
      { label: "Dogecoin", href: "/coins/doge", icon: "/coins/doge.svg" },
      { label: "Bitcoin Cash", href: "/coins/bch", icon: "/coins/bch.svg" },
      { label: "DigiByte", href: "/coins/dgb", icon: "/coins/dgb.svg" },
    ],
  },
];

export const mobileGroups: { label: string; links: NavLink[] }[] = [
  {
    label: "Mining",
    links: [
      { label: "Getting Started", href: "/getting-started", description: "Step-by-step setup guide" },
      { label: "Recommended Miners", href: "/miners", description: "Hardware for every budget" },
      {
        label: "Calculator",
        href: "https://app.bitmernsolo.com/calculator",
        external: true,
        description: "Estimate your mining odds",
      },
      { label: "Pool Stats", href: "/pool-stats", description: "Live hashrate & network data" },
      { label: "Blocks Found", href: "/blocks", description: "Explorer-verified block finds" },
      { label: "How It Works", href: "/how-it-works", description: "Solo mining explained" },
      { label: "FAQ", href: "/faq", description: "Common questions answered" },
      { label: "Pricing", href: "/pricing", description: "Simple 1% fee on blocks" },
    ],
  },
  {
    label: "Coins",
    links: [
      { label: "Bitcoin", href: "/coins/btc", icon: "/coins/btc.svg" },
      { label: "Litecoin", href: "/coins/ltc", icon: "/coins/ltc.svg" },
      { label: "Dogecoin", href: "/coins/doge", icon: "/coins/doge.svg" },
      { label: "Bitcoin Cash", href: "/coins/bch", icon: "/coins/bch.svg" },
      { label: "DigiByte", href: "/coins/dgb", icon: "/coins/dgb.svg" },
    ],
  },
];

export const topLevelLinks: NavLink[] = [
  { label: "Docs", href: "/docs" },
  { label: "Blog", href: "/blog" },
  { label: "Shop", href: "/shop" },
  { label: "Hosting", href: "https://bitmernmining.com", external: true },
];
