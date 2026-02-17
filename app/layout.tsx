import type { Metadata } from "next";
import Script from "next/script";
import { Space_Grotesk, Manrope, JetBrains_Mono } from "next/font/google";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bitmern Solo — Solo Mining Pool for BTC, LTC, DOGE, BCH & DGB",
  description:
    "Mine solo with zero pool fees. Connect your ASIC, keep 100% of the block reward. Real-time dashboards, multi-coin support, and enterprise-grade infrastructure.",
  openGraph: {
    title: "Bitmern Solo — Solo Mining Pool",
    description:
      "Mine solo with zero pool fees. Connect your ASIC, keep 100% of the block reward.",
    type: "website",
    url: "https://bitmernsolo.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bitmern Solo — Solo Mining Pool",
    description:
      "Mine solo with zero pool fees. Connect your ASIC, keep 100% of the block reward.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${spaceGrotesk.variable} ${manrope.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        {process.env.NODE_ENV === "development" && (
          <Script
            src="//unpkg.com/react-grab/dist/index.global.js"
            crossOrigin="anonymous"
            strategy="beforeInteractive"
          />
        )}
        {process.env.NODE_ENV === "development" && (
          <Script
            src="//unpkg.com/@react-grab/mcp/dist/client.global.js"
            strategy="lazyOnload"
          />
        )}
      </head>
      <body className="min-h-screen bg-background antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
