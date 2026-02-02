# Backend Codemap

**Last Updated:** 2026-02-02
**Runtime:** Next.js Server Side / Bun

## Scraper Logic (`utils/crawler.ts`)

The "backend" of this application primarily consists of server-side data fetching and parsing logic.

### Key Functions

| Function      | Purpose                                                 |
| ------------- | ------------------------------------------------------- |
| `getMeta()`   | Main entry point for fetching and parsing meta data.    |
| `fetchHtml()` | Fetches raw HTML from Limitless TCG with `force-cache`. |

### Logic Flow

1. **Header Identification**: Scans table `<th>` elements to identify column indices (deck, count, share, score, win rate).
2. **Row Parsing**: Iterates through `<tbody> tr` elements.
3. **Data Extraction**: Prefers `data-*` attributes (like `data-share`, `data-winrate`) for accuracy, falling back to text parsing.
4. **URL Resolution**: Converts relative links to absolute URLs for deck details and matchups.

## External API Dependencies

- `https://play.limitlesstcg.com/decks?game=POCKET`: Primary data source.
