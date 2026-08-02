# Data Codemap

**Last Updated:** 2026-08-02

## Data Models

### `ParsedMetaRow`

Defined in `utils/crawler.ts`, this interface represents a single deck's meta statistics.

| Field           | Type       | Description                                |
| --------------- | ---------- | ------------------------------------------ |
| `deck`          | `string`   | Name of the deck.                          |
| `deckUrl`       | `string`   | Link to the deck details on Limitless TCG. |
| `pokemonImages` | `string[]` | URLs of sprites representing the deck.     |
| `count`         | `number`   | Total number of recorded games/entries.    |
| `sharePercent`  | `number`   | Percentage of the meta (0-100).            |
| `winPercent`    | `number`   | Win rate percentage (0-100).               |
| `total`         | `number`   | Total matches (wins + losses + ties).      |

`getPageData()` also returns `set: string | undefined` — the current Limitless set label (from `select#set` + description).

## External Data Source

- **Source**: `play.limitlesstcg.com`
- **Format**: HTML (Scraped)
- **Caching**: Next.js fetch with `revalidate: 3600` (1 hour).
