import Link from "next/link";
import { getPageData } from "@/utils/crawler";
import { MetaTable } from "@/components/MetaTable";
import { PageFooter, PageHeader, PageShell } from "@/components/PageChrome";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const { rows: data, set: currentSet } = await getPageData();

  if (!data || data.length === 0) {
    return (
      <PageShell>
        <PageHeader />

        <div className="flex min-h-100 flex-col items-center justify-center rounded-lg border border-dashed text-center">
          <h2 className="font-display text-2xl font-semibold tracking-tight">
            No decks to show
          </h2>
          <p className="text-muted-foreground mt-2 max-w-sm">
            Limitless did not return a meta table. Refresh to try again.
          </p>
          <Button asChild className="mt-6">
            <Link href="/">Refresh</Link>
          </Button>
        </div>

        <PageFooter />
      </PageShell>
    );
  }

  return (
    <PageShell>
      <PageHeader set={currentSet} />

      <MetaTable data={data} />

      <PageFooter />
    </PageShell>
  );
}
