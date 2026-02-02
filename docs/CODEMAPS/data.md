# Data Codemap

**Last Updated:** 2026-02-02

## Data Models

### `ParsedMetaRow`

Defined in `utils/crawler.ts`, this interface represents a single deck's meta statistics.

| Field           | Type        | Description                                     |
| --------------- | ----------- | ----------------------------------------------- |
| `position`      | `number`    | Rank in the meta.                               |
| `deck`          | `string`    | Name of the deck.                               |
| `deckUrl`       | `string`    | Link to the deck details on Limitless TCG.      |
| `pokemonImages` | `string[]`  | URLs of sprites representing the deck.          |
| `count`         | `number`    | Total number of recorded games/entries.         |
| `sharePercent`  | `number`    | Percentage of the meta (0-100).                 |
| `winPercent`    | `number`    | Win rate percentage (0-100).                    |
| `score`         | `interface` | Object containing `wins`, `losses`, and `ties`. |
| `matchupsUrl`   | `string`    | Link to detailed matchups.                      |

## External Data Source

- **Source**: `play.limitlesstcg.com`
- **Format**: HTML (Scraped)
- **Caching**: Next.js `force-cache` is used on the initial HTML fetch.
