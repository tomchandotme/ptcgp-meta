import { getMeta } from "@/utils/crawler";
import { MetaTable } from "@/components/MetaTable";

export default async function Home() {
  const data = await getMeta();

  if (!data || data.length === 0) {
    return (
      <main className="container mx-auto max-w-5xl px-4 py-8">
        <div className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight">PTCGP Meta</h1>
          <p className="text-muted-foreground mt-1">
            Competitive deck statistics scraped from Limitless TCG.
          </p>
        </div>

        <div className="flex min-h-100 flex-col items-center justify-center rounded-xl border border-dashed text-center">
          <h2 className="text-xl font-semibold">No data available</h2>
          <p className="text-muted-foreground mt-2 max-w-sm">
            We couldn&apos;t retrieve meta data at this time. This might be due
            to a temporary issue with the upstream provider.
          </p>
        </div>

        <footer className="text-muted-foreground mt-20 flex items-center justify-between border-t pt-8 pb-12 text-xs">
          <p>© {new Date().getFullYear()} PTCGP Meta</p>
          <p>Data provided by play.limitlesstcg.com</p>
        </footer>
      </main>
    );
  }

  return (
    <main className="container mx-auto max-w-5xl px-4 py-8">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight">PTCGP Meta</h1>
        <p className="text-muted-foreground mt-1">
          Competitive deck statistics scraped from Limitless TCG.
        </p>
      </div>

      <MetaTable data={data} />

      <footer className="text-muted-foreground mt-20 flex items-center justify-between border-t pt-8 pb-12 text-xs">
        <p>© {new Date().getFullYear()} PTCGP Meta</p>
        <p>Data provided by play.limitlesstcg.com</p>
      </footer>
    </main>
  );
}
