# Backend Codemap

**Last Updated:** 2026-08-02
**Runtime:** Next.js Server Side / Bun

## Scraper Logic (`utils/crawler.ts`)

The "backend" of this application primarily consists of server-side data fetching and parsing logic.

### Key Functions

| Function            | Purpose                                                                                   |
| ------------------- | ----------------------------------------------------------------------------------------- |
| `getPageData()`     | Main entry point: one HTML fetch, returns `{ rows, set }`. Throws on fetch/parse failure. |
| `parsePageHtml()`   | Pure HTML → `{ rows, set }` helper (used by tests and `getPageData`).                     |
| `parseMeta()`       | Parses meta table rows from a Cheerio document.                                           |
| `parseCurrentSet()` | Reads the current set label from the page.                                                |
| `fetchHtml()`       | Fetches raw HTML from Limitless TCG with `next: { revalidate: 3600 }`.                    |

### Logic Flow

1. **Single Fetch**: `getPageData()` loads HTML once via `fetchHtml()`.
2. **Header Identification**: Scans table `<th>` elements to identify column indices (deck, count, share, score, win rate).
3. **Row Parsing**: Iterates through `<tbody> tr` elements.
4. **Data Extraction**: Prefers `data-*` attributes (like `data-share`, `data-winrate`) for accuracy, falling back to text parsing. Score cells are used only to derive `total` (wins + losses + ties).
5. **Set Label**: Reads `select#set` and the content description paragraph.
6. **URL Resolution**: Converts relative deck links to absolute URLs.
7. **Errors**: Fetch/parse failures are rethrown so `app/error.tsx` can render. A successful parse with zero rows still returns `{ rows: [], set }` for the empty state.

## External API Dependencies

- `https://play.limitlesstcg.com/decks?game=POCKET`: Primary data source.
