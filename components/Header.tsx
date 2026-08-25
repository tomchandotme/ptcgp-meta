import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  return (
    <header className="bg-background/95 sticky top-0 z-50 w-full border-b backdrop-blur-sm">
      <div className="container mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <Link
          href="/"
          className="font-display text-xl font-semibold tracking-[0.12em] uppercase"
        >
          PTCGP
          <span className="text-foil"> Meta</span>
        </Link>
        <ThemeToggle />
      </div>
    </header>
  );
}
