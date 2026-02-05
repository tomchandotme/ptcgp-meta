import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  return (
    <header className="bg-background/95 sticky top-0 z-50 w-full border-b backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Link href="/" className="text-lg font-bold tracking-tight">
            PTCGP<span className="text-muted-foreground">Meta</span>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
