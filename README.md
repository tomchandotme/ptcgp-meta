# PTCGP Meta Tracker

A modern Next.js application that tracks and analyzes Pokemon Trading Card Game Pocket (PTCGP) meta data by scraping official tournament results and statistics.

## Features

- **Real-time Scraping**: Fetches the latest deck statistics from Limitless TCG.
- **Interactive Data Table**: Sort, search, filter, and analyze meta percentages and win rates.
- **Modern Stack**: Built with Next.js 16, React 19, and Tailwind CSS 4.
- **Fast Performance**: Optimized for the Bun runtime with server-side data fetching.

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (required for install, scripts, and CI; `packageManager` is `bun@1.3.14`)

### Installation

```bash
# Install dependencies
bun install
```

### Development

```bash
# Start the development server
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Scripts

```bash
bun lint          # oxlint
bun format        # Prettier write
bun format:check  # Prettier check
bun test          # Bun unit tests
bun typecheck     # tsc --noEmit
bun check         # lint + typecheck + test
bun run build     # production build
bun start         # production server
```

## Architecture

This project follows the Next.js App Router architecture with a focus on server-side data extraction.

- **Frontend**: React 19 Client Components for interactivity (sorting/search/filtering).
- **Data Fetching**: Server Components perform HTML scraping using `cheerio` (`getPageData()`, 1h revalidate).
- **UI System**: Tailwind CSS 4 with Radix UI primitives and Lucide icons.
- **Linting**: oxlint (not ESLint).

Detailed architecture maps can be found in [docs/CODEMAPS/](docs/CODEMAPS/architecture.md):

- [Overall Architecture](docs/CODEMAPS/architecture.md)
- [Backend Structure](docs/CODEMAPS/backend.md)
- [Frontend Structure](docs/CODEMAPS/frontend.md)
- [Data Models](docs/CODEMAPS/data.md)

## Documentation

- `utils/crawler.ts`: Core scraper logic for Limitless TCG.
- `components/MetaTable/`: Interactive dashboard for meta data.

## License

Private project. No public license is provided.
