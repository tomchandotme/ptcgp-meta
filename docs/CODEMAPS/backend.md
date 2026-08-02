# Backend Codemap

**Last Updated:** 2026-08-02
**Runtime:** Next.js Server Side / Bun

## Scraper Logic (`utils/crawler.ts`)

The "backend" of this application primarily consists of server-side data fetching and parsing logic.

### Key Functions

| Function          | Purpose                                                                |
| ----------------- | ---------------------------------------------------------------------- |
| `getPageData()`   | Main entry point: one HTML fetch, returns `{ rows, set }`.             |
| `getMeta()`       | Convenience wrapper returning `rows` from `getPageData()`.             |
| `getCurrentSet()` | Convenience wrapper returning `set` from `getPageData()`.              |
| `fetchHtml()`     | Fetches raw HTML from Limitless TCG with `next: { revalidate: 3600 }`. |

### Logic Flow

1. **Single Fetch**: `getPageData()` loads HTML once via `fetchHtml()`.
2. **Header Identification**: Scans table `<th>` elements to identify column indices (deck, count, share, score, win rate).
3. **Row Parsing**: Iterates through `<tbody> tr` elements.
4. **Data Extraction**: Prefers `data-*` attributes (like `data-share`, `data-winrate`) for accuracy, falling back to text parsing.
5. **Set Label**: Reads `select#set` and the content description paragraph.
6. **URL Resolution**: Converts relative links to absolute URLs for deck details and matchups.

## External API Dependencies

- `https://play.limitlesstcg.com/decks?game=POCKET`: Primary data source.
