import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

export default function ProductNotFound() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
      <h2 className="font-heading text-xl font-semibold">Product not found</h2>
      <p className="text-sm text-muted-foreground max-w-xs">
        The product you&apos;re looking for doesn&apos;t exist or is no longer available.
      </p>
      <Link href="/shop">
        <Button variant="outline" className="gap-2">
          <ChevronLeft className="h-3.5 w-3.5" />
          Back to Shop
        </Button>
      </Link>
    </div>
  );
}
