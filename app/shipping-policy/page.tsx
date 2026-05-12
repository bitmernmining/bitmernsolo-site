import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shipping Policy — Bitmern Solo",
  description:
    "How we ship mining hardware: regions, processing times, carriers, costs, customs and duties, and what to do if your order is lost or damaged.",
  alternates: { canonical: "/shipping-policy" },
  openGraph: {
    title: "Shipping Policy — Bitmern Solo",
    description:
      "Shipping regions, processing times, carriers, costs, customs and duties for mining hardware orders.",
    url: "/shipping-policy",
    type: "article",
  },
};

export default function ShippingPolicyPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        Shipping Policy
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Last updated: May 11, 2026
      </p>

      <div className="mt-10 space-y-8 text-sm leading-relaxed text-muted-foreground [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-foreground [&_h2]:mb-3 [&_h3]:text-sm [&_h3]:font-semibold [&_h3]:text-foreground [&_h3]:mb-1 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1">
        <section>
          <h2>1. Shipping Regions</h2>
          <p>
            We ship mining hardware to most countries worldwide. Some
            jurisdictions are excluded due to customs restrictions, sanctions,
            or carrier limitations. If your country is not selectable at
            checkout, contact{" "}
            <a
              href="mailto:support@bitmernsolo.com"
              className="text-primary hover:underline"
            >
              support@bitmernsolo.com
            </a>{" "}
            before placing an order.
          </p>
        </section>

        <section>
          <h2>2. Processing Times</h2>
          <p>
            Orders are processed within{" "}
            <span className="text-foreground">1–3 business days</span> of
            payment confirmation on the blockchain. Cryptocurrency transactions
            require sufficient network confirmations before the order is
            released to fulfillment — typically:
          </p>
          <ul>
            <li>Bitcoin (BTC): 2 confirmations (~20 minutes)</li>
            <li>Litecoin (LTC): 6 confirmations (~15 minutes)</li>
            <li>Dogecoin (DOGE), Bitcoin Cash (BCH), Digibyte (DGB): 10 confirmations</li>
          </ul>
          <p className="mt-2">
            Pre-order and made-to-order hardware (noted on the product page)
            have longer lead times — see the product page for the current
            estimate.
          </p>
        </section>

        <section>
          <h2>3. Carriers</h2>
          <p>
            We ship via insured tracked services from one of the following
            carriers, chosen automatically at checkout based on destination,
            weight, and customs profile:
          </p>
          <ul>
            <li>DHL Express (international, fastest)</li>
            <li>FedEx International Priority</li>
            <li>UPS Worldwide Saver</li>
            <li>Local postal services for low-value accessories where available</li>
          </ul>
          <p className="mt-2">
            All shipments include tracking and signature on delivery.
          </p>
        </section>

        <section>
          <h2>4. Shipping Costs</h2>
          <p>
            Shipping is calculated at checkout based on weight, dimensions, and
            destination. Estimates appear on the product page and are
            finalized in the cart. We do not mark up shipping — you pay the
            carrier rate plus packaging.
          </p>
          <p className="mt-2">
            Free shipping promotions, when active, are limited to specific
            regions and product lines and will be clearly marked.
          </p>
        </section>

        <section>
          <h2>5. Customs &amp; Duties</h2>
          <p>
            International orders may be subject to import duties, taxes, and
            customs fees levied by the destination country. These charges are
            the responsibility of the buyer and are{" "}
            <span className="text-foreground">not included</span> in the
            product price or shipping cost.
          </p>
          <p className="mt-2">
            We declare hardware at its full purchase value on commercial
            invoices, as required by international shipping regulations. We
            cannot mark shipments as gifts or under-declare value.
          </p>
        </section>

        <section>
          <h2>6. Lost or Damaged Packages</h2>
          <p>
            If your tracking shows no movement for{" "}
            <span className="text-foreground">10 business days</span> or your
            package arrives damaged, email{" "}
            <a
              href="mailto:support@bitmernsolo.com"
              className="text-primary hover:underline"
            >
              support@bitmernsolo.com
            </a>{" "}
            with your order number and tracking number within 30 days of the
            shipping date. We will open a carrier investigation and arrange a
            replacement or refund once the investigation concludes.
          </p>
          <p className="mt-2">
            Damaged items must be photographed in their original packaging
            before disposal — carriers require this evidence to process a
            claim.
          </p>
        </section>

        <section>
          <h2>7. Returns</h2>
          <p>
            For our full returns policy — including warranty claims, dead-on-
            arrival hardware, and the return window — please refer to the
            relevant product page or contact{" "}
            <a
              href="mailto:support@bitmernsolo.com"
              className="text-primary hover:underline"
            >
              support@bitmernsolo.com
            </a>
            .
          </p>
        </section>

        <section>
          <h2>8. Changes to this Policy</h2>
          <p>
            We may update this policy from time to time. Material changes will
            be reflected in the date shown above. Orders are governed by the
            policy in effect on the date the order was placed.
          </p>
        </section>

        <section>
          <h2>9. Contact</h2>
          <p>
            For shipping questions, email{" "}
            <a
              href="mailto:support@bitmernsolo.com"
              className="text-primary hover:underline"
            >
              support@bitmernsolo.com
            </a>
            .
          </p>
        </section>
      </div>
    </article>
  );
}
