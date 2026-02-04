import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Loading() {
  return (
    <main className="container mx-auto max-w-5xl px-4 py-8">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight">PTCGP Meta</h1>
        <p className="text-muted-foreground mt-1">
          Competitive deck statistics scraped from Limitless TCG.
        </p>
      </div>

      <div className="w-full space-y-6">
        <div className="bg-card flex flex-col items-start justify-between gap-4 rounded-lg border p-4 sm:flex-row sm:items-center">
          <div className="space-y-1">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-48" />
          </div>
          <Skeleton className="h-4 w-full sm:w-64" />
        </div>

        <div className="bg-card overflow-hidden rounded-xl border shadow-sm">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead>Deck</TableHead>
                <TableHead>Count</TableHead>
                <TableHead>Share</TableHead>
                <TableHead>Matches</TableHead>
                <TableHead>Win Rate</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 10 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-6 w-12 rounded-sm" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-8" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-12" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-12" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-12" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </main>
  );
}
