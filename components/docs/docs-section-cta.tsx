import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function DocsCta() {
  return (
<div className="rounded-lg border border-primary/20 bg-primary/5 p-8 text-center">
            <h2 className="text-2xl font-bold tracking-tight">Ready to mine?</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Create a free account and start submitting shares in minutes.
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <Button size="lg" className="glow" asChild>
                <a href="https://app.bitmernsolo.com/signup">
                  Start Mining <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/getting-started">Getting Started Guide</Link>
              </Button>
            </div>
          </div>
  );
}
