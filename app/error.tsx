"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("App error:", error);
  }, [error]);

  return (
    <main className="container mx-auto flex min-h-[60vh] max-w-5xl flex-col items-center justify-center px-4 py-8 text-center">
      <h1 className="font-display text-4xl font-semibold tracking-tight">
        Meta data didn&apos;t load
      </h1>
      <p className="text-muted-foreground mt-4 mb-8 text-lg">
        Refresh and try again.
      </p>
      <div className="flex gap-4">
        <Button onClick={() => reset()} variant="default">
          Try again
        </Button>
        <Button onClick={() => window.location.reload()} variant="outline">
          Reload page
        </Button>
      </div>
    </main>
  );
}
