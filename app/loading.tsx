import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PageHeader, PageShell } from "@/components/PageChrome";

export default function Loading() {
  return (
    <PageShell>
      <PageHeader />

      <div className="w-full space-y-6">
        <div className="grid gap-6 border-b pb-5 md:grid-cols-2">
          <div className="space-y-3">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-3 w-40" />
            <Skeleton className="h-9 w-full" />
          </div>
          <div className="space-y-3">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-3 w-52" />
            <Skeleton className="h-9 w-full" />
          </div>
        </div>

        <div className="bg-card overflow-hidden rounded-lg border">
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
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-14 w-16 rounded-sm" />
                      <div className="space-y-1">
                        <Skeleton className="h-4 w-28" />
                        <Skeleton className="h-3 w-20" />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Skeleton className="mx-auto h-4 w-8" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="mx-auto h-4 w-12" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="mx-auto h-4 w-12" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="mx-auto h-5 w-14 rounded-full" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </PageShell>
  );
}
