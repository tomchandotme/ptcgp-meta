import { getMeta } from "@/utils/crawler";

export default async function Home() {
  const data = await getMeta();

  return (
    <div>
      <div>cool</div>
      <div className="whitespace-pre">{JSON.stringify(data, null, 2)}</div>
    </div>
  );
}
