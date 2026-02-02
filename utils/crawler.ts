import * as cheerio from "cheerio";

const META_SITE_URL = "https://play.limitlesstcg.com/decks?game=POCKET";

const fetchHtml = async () => {
  const data = await fetch(META_SITE_URL, { cache: "force-cache" });

  return data.text();
};

export interface ParsedMetaRow {
  position?: number;
  deck: string;
  deckUrl?: string;
  pokemonImages?: string[];
  count?: number;
  share?: number; // fraction 0..1
  sharePercent?: number; // 0..100
  score?: { wins: number; losses: number; ties: number };
  total?: number;
  calculatedWinPercent?: number; // 0..100
  calculatedWin?: number; // fraction 0..1
  win?: number; // fraction 0..1
  winPercent?: number; // 0..100
  matchupsUrl?: string;
}

export const getMeta = async () => {
  const rawHtml = await fetchHtml();

  const $ = cheerio.load(rawHtml);

  // 1. Extract headers to use as object keys
  const headers = $("th")
    .map((_, el) => $(el).text().trim())
    .get();

  const findIndexBy = (needle: string) =>
    headers.findIndex((h) => h.toLowerCase().includes(needle.toLowerCase()));

  const deckIdx = findIndexBy("deck");
  const countIdx = findIndexBy("count");
  const shareIdx = findIndexBy("share");
  const scoreIdx = findIndexBy("score");
  const winIdx = findIndexBy("win");

  // 2. Map each row into a structured object, preferring data-* attributes
  const parsed = $("tbody tr")
    .get()
    .map((tr) => {
      const $tr = $(tr);
      const tds = $tr.find("td");

      const out: ParsedMetaRow = { deck: "" };

      // Position (rank)
      const posText = tds.eq(0).text().trim();
      const posN = parseInt(posText, 10);
      if (!Number.isNaN(posN)) out.position = posN;

      // Pokemon images
      const imgs = tds
        .find("img")
        .map((_, img) => $(img).attr("src") || "")
        .get();
      if (imgs.length) out.pokemonImages = imgs;

      // Deck name + url
      if (deckIdx >= 0) {
        const $deckCell = tds.eq(deckIdx);
        const $a = $deckCell.find("a");
        const deckName = ($a.text() || $deckCell.text()).trim();
        out.deck = deckName;
        const href = $a.attr("href");
        if (href) out.deckUrl = new URL(href, META_SITE_URL).toString();
      }

      // Count
      if (countIdx >= 0) {
        const c = tds.eq(countIdx).text().trim();
        const n = parseInt(String(c).replace(/,/g, ""), 10);
        if (!Number.isNaN(n)) out.count = n;
      }

      // Share: prefer tr data-share attr
      const dataShare = $tr.attr("data-share");
      if (dataShare != null) {
        const f = parseFloat(dataShare);
        if (!Number.isNaN(f)) {
          out.share = f;
          out.sharePercent = +(f * 100).toFixed(4);
        }
      } else if (shareIdx >= 0) {
        const s = tds.eq(shareIdx).text().trim();
        const pct = parseFloat(String(s).replace("%", ""));
        if (!Number.isNaN(pct)) {
          out.sharePercent = pct;
          out.share = pct / 100;
        }
      }

      // Score + matchups URL
      if (scoreIdx >= 0) {
        const $scoreCell = tds.eq(scoreIdx);
        const $scoreA = $scoreCell.find("a");
        const scoreText = ($scoreA.text() || $scoreCell.text()).trim();
        if (scoreText) {
          const parts = scoreText.split("-").map((s) => s.trim());
          const wins = parseInt(parts[0] ?? "0", 10) || 0;
          const losses = parseInt(parts[1] ?? "0", 10) || 0;
          const ties = parseInt(parts[2] ?? "0", 10) || 0;
          out.score = { wins, losses, ties };
          out.total = wins + losses + ties;
          out.calculatedWinPercent =
            out.total > 0 ? +((wins / out.total) * 100).toFixed(2) : undefined;
          out.calculatedWin = out.total > 0 ? +(wins / out.total) : undefined;
        }
        const href = $scoreCell.find("a").attr("href");
        if (href) out.matchupsUrl = new URL(href, META_SITE_URL).toString();
      }

      // Win %: prefer tr data-winrate
      const dataWin = $tr.attr("data-winrate");
      if (dataWin != null) {
        const f = parseFloat(dataWin);
        if (!Number.isNaN(f)) {
          out.win = f;
          out.winPercent = +(f * 100).toFixed(2);
        }
      } else if (winIdx >= 0) {
        const w = tds.eq(winIdx).text().trim();
        const pct = parseFloat(String(w).replace("%", ""));
        if (!Number.isNaN(pct)) {
          out.winPercent = pct;
          out.win = pct / 100;
        }
      }

      return out;
    })
    .filter((o) => o.deck && o.deck.length);

  return parsed;
};
