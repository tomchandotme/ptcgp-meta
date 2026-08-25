import type { ReactNode } from "react";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <main className="container mx-auto max-w-5xl px-4 py-6">{children}</main>
  );
}

export function PageHeader({ set }: { set?: string }) {
  return (
    <div className={set ? "mb-6" : "sr-only"}>
      <h1 className="sr-only">
        PTCGP Meta. Competitive Pokémon TCG Pocket deck statistics.
      </h1>
      {set ? (
        <p className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
          <span className="font-display text-foil text-xs font-semibold tracking-[0.22em] uppercase">
            Set
          </span>
          <span className="text-sm">{set}</span>
        </p>
      ) : null}
    </div>
  );
}

export function PageFooter() {
  return (
    <footer className="text-muted-foreground mt-16 flex items-center justify-between border-t pt-6 pb-10 text-xs">
      <p>© {new Date().getFullYear()} PTCGP Meta</p>
      <p>Data from Limitless TCG</p>
    </footer>
  );
}
