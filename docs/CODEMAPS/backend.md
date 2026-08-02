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

`fetchHtml()` is a private helper (not exported): fetches Limitless HTML with `next: { revalidate: 3600 }` and a 15s `AbortSignal` timeout.

### Logic Flow

1. **Single Fetch**: `getPageData()` loads HTML once via `fetchHtml()`.
2. **Table Scope**: Locates the meta table (headers containing "Deck"), ignoring unrelated tables.
3. **Header Identification**: Scans that table's `<th>` elements to identify column indices (deck, count, share, score, win rate).
4. **Row Parsing**: Iterates through data rows (`td` cells).
5. **Data Extraction**: Prefers `data-*` attributes (`data-share`, `data-winrate`). Fractions (≤1) are scaled to percent; values >1 are treated as already percent. Score cells derive `total` (wins + losses + ties).
6. **Set Label**: Prefers selected `select#set` option text (Limitless often omits `value`), plus the description paragraph.
7. **URL Resolution**: Converts relative deck links to absolute URLs.
8. **Errors**: Fetch failures are logged and rethrown so `app/error.tsx` can render. A successful parse with zero rows still returns `{ rows: [], set }` for the empty state.

## External API Dependencies

- `https://play.limitlesstcg.com/decks?game=POCKET`: Primary data source.
