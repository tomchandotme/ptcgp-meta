import { getPageData } from "@/utils/crawler";
import { MetaTable } from "@/components/MetaTable";
import { PageFooter, PageHeader, PageShell } from "@/components/PageChrome";

export default async function Home() {
  const { rows: data, set: currentSet } = await getPageData();

  if (!data || data.length === 0) {
    return (
      <PageShell>
        <PageHeader />

        <div className="flex min-h-100 flex-col items-center justify-center rounded-xl border border-dashed text-center">
          <h2 className="text-xl font-semibold">No data available</h2>
          <p className="text-muted-foreground mt-2 max-w-sm">
            We couldn&apos;t retrieve meta data at this time. This might be due
            to a temporary issue with the upstream provider.
          </p>
        </div>

        <PageFooter />
      </PageShell>
    );
  }

  return (
    <PageShell>
      <PageHeader subtitle={<>Set: {currentSet}</>} />

      <MetaTable data={data} />

      <PageFooter />
    </PageShell>
  );
}
