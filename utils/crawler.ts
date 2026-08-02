import * as cheerio from "cheerio";

const META_SITE_URL = "https://play.limitlesstcg.com/decks?game=POCKET";
const FETCH_TIMEOUT_MS = 15_000;

const fetchHtml = async () => {
  try {
    const data = await fetch(META_SITE_URL, {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });
    if (!data.ok) {
      throw new Error(`Failed to fetch meta data: ${data.statusText}`);
    }
    return await data.text();
  } catch (error) {
    console.error("Crawler fetch error:", error);
    throw error;
  }
};

export interface ParsedMetaRow {
  deck: string;
  deckUrl?: string;
  pokemonImages?: string[];
  count?: number;
  sharePercent?: number; // 0..100
  total?: number;
  winPercent?: number; // 0..100
}

type CheerioRoot = cheerio.CheerioAPI;

/** Convert data-* rate attrs: fractions (0–1] → percent; values > 1 already percent. */
const attrToPercent = (raw: string, decimals: number): number | undefined => {
  const f = parseFloat(raw);
  if (Number.isNaN(f)) return undefined;
  const pct = f > 1 ? f : f * 100;
  return +pct.toFixed(decimals);
};

const findMetaTable = ($: CheerioRoot) => {
  const $tables = $("table").filter((_, el) => {
    const $el = $(el);
    const $ths = $el.find("thead th");
    const headers = ($ths.length ? $ths : $el.find("tr").first().children("th"))
      .map((__, th) => $(th).text().trim().toLowerCase())
      .get();
    return headers.some((h) => h.includes("deck"));
  });
  return $tables.first();
};

export const parseMeta = ($: CheerioRoot): ParsedMetaRow[] => {
  const $table = findMetaTable($);
  if ($table.length === 0) {
    console.warn("Crawler: No meta table found in HTML");
    return [];
  }

  // 1. Extract headers to use as object keys (scoped to meta table)
  const $headerCells = $table.find("thead th");
  const headers = (
    $headerCells.length
      ? $headerCells
      : $table.find("tr").first().children("th")
  )
    .map((_, el) => $(el).text().trim())
    .get();

  if (headers.length === 0) {
    console.warn("Crawler: No headers found in HTML");
    return [];
  }

  const findIndexBy = (needle: string) =>
    headers.findIndex((h) => h.toLowerCase().includes(needle.toLowerCase()));

  const deckIdx = findIndexBy("deck");
  const countIdx = findIndexBy("count");
  const shareIdx = findIndexBy("share");
  const scoreIdx = findIndexBy("score");
  const winIdx = findIndexBy("win");

  // 2. Map each row into a structured object, preferring data-* attributes
  // Cheerio may synthesize <tbody>; live Limitless HTML often omits it.
  return $table
    .find("tbody tr")
    .filter((_, el) => $(el).children("td").length > 0)
    .get()
    .map((tr) => {
      const $tr = $(tr);
      const tds = $tr.find("td");

      const out: ParsedMetaRow = { deck: "" };

      // Pokemon images
      const imgs = tds
        .find("img")
        .map((_, img) => $(img).attr("src") || "")
        .get()
        .filter(Boolean);
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
        const pct = attrToPercent(dataShare, 4);
        if (pct != null) out.sharePercent = pct;
      } else if (shareIdx >= 0) {
        const s = tds.eq(shareIdx).text().trim();
        const pct = parseFloat(String(s).replace("%", ""));
        if (!Number.isNaN(pct)) {
          out.sharePercent = pct;
        }
      }

      // Score cell: derive total matches only (wins + losses + ties)
      if (scoreIdx >= 0) {
        const $scoreCell = tds.eq(scoreIdx);
        const $scoreA = $scoreCell.find("a");
        const scoreText = ($scoreA.text() || $scoreCell.text()).trim();
        if (scoreText) {
          const parts = scoreText.split("-").map((s) => s.trim());
          const wins = parseInt(parts[0] ?? "0", 10) || 0;
          const losses = parseInt(parts[1] ?? "0", 10) || 0;
          const ties = parseInt(parts[2] ?? "0", 10) || 0;
          out.total = wins + losses + ties;
        }
      }

      // Win %: prefer tr data-winrate
      const dataWin = $tr.attr("data-winrate");
      if (dataWin != null) {
        const pct = attrToPercent(dataWin, 2);
        if (pct != null) out.winPercent = pct;
      } else if (winIdx >= 0) {
        const w = tds.eq(winIdx).text().trim();
        const pct = parseFloat(String(w).replace("%", ""));
        if (!Number.isNaN(pct)) {
          out.winPercent = pct;
        }
      }

      return out;
    })
    .filter((o) => o.deck && o.deck.length);
};

export const parseCurrentSet = ($: CheerioRoot): string | undefined => {
  const normalize = (s: string) => s.trim().replace(/\s+/g, " ");

  // Prefer visible option text (Limitless often omits value=; text is "B4 - Ruler…")
  const selectedText = normalize($("select#set option:selected").text() || "");
  const rawSetVal = $("select#set").val();
  const fromVal =
    typeof rawSetVal === "string"
      ? normalize(rawSetVal)
      : Array.isArray(rawSetVal)
        ? normalize(rawSetVal.join(" "))
        : "";
  const setName = selectedText || fromVal || undefined;

  // Prefer page summary near the meta table (Limitless puts <p> before <table.meta>)
  const description = normalize(
    $(".container.content > p").text() ||
      $("table.meta").prevAll("p").first().text() ||
      "",
  );

  if (setName && description) return `${setName} (${description})`;
  if (setName) return setName;
  if (description) return description;
  return undefined;
};

export const parsePageHtml = (
  html: string,
): { rows: ParsedMetaRow[]; set: string | undefined } => {
  const $ = cheerio.load(html);
  return {
    rows: parseMeta($),
    set: parseCurrentSet($),
  };
};

export const getPageData = async (): Promise<{
  rows: ParsedMetaRow[];
  set: string | undefined;
}> => {
  const rawHtml = await fetchHtml();
  return parsePageHtml(rawHtml);
};
