# Data Codemap

**Last Updated:** 2026-08-02

## Data Models

### `ParsedMetaRow`

Defined in `utils/crawler.ts`, this interface represents a single deck's meta statistics.

| Field           | Type       | Required | Description                                |
| --------------- | ---------- | -------- | ------------------------------------------ |
| `deck`          | `string`   | yes      | Name of the deck.                          |
| `deckUrl`       | `string`   | no       | Link to the deck details on Limitless TCG. |
| `pokemonImages` | `string[]` | no       | URLs of sprites representing the deck.     |
| `count`         | `number`   | no       | Total number of recorded games/entries.    |
| `sharePercent`  | `number`   | no       | Percentage of the meta (0-100).            |
| `winPercent`    | `number`   | no       | Win rate percentage (0-100).               |
| `total`         | `number`   | no       | Total matches (wins + losses + ties).      |

`getPageData()` also returns `set: string | undefined` — the current Limitless set label (selected `select#set` option **text** + description paragraph).

## External Data Source

- **Source**: `play.limitlesstcg.com`
- **Format**: HTML (Scraped)
- **Caching**: Next.js fetch with `revalidate: 3600` (1 hour); 15s abort timeout.
