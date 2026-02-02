import { getMeta } from "@/utils/crawler";
import { MetaTable } from "@/components/MetaTable";

export default async function Home() {
  const data = await getMeta();

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
