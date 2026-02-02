# PTCGP Meta Tracker

A modern Next.js application that tracks and analyzes Pokemon Trading Card Game Pocket (PTCGP) meta data by scraping official tournament results and statistics.

## Features

- **Real-time Scraping**: Fetches the latest deck statistics from Limitless TCG.
- **Interactive Data Table**: Sort, filter, and analyze meta percentages and win rates.
- **Modern Stack**: Built with Next.js 16, React 19, and Tailwind CSS 4.
- **Fast Performance**: Optimized for the Bun runtime with server-side data fetching.

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (recommended) or Node.js

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

### Production

```bash
# Build the application
bun run build

# Start the production server
bun start
```

## Architecture

This project follows the Next.js App Router architecture with a focus on server-side data extraction.

- **Frontend**: React 19 Client Components for interactivity (sorting/filtering).
- **Data Fetching**: Server Components perform HTML scraping using `cheerio`.
- **UI System**: Tailwind CSS 4 with Radix UI primitives and Lucide icons.

Detailed architecture maps can be found in [docs/CODEMAPS/](docs/CODEMAPS/architecture.md):
- [Overall Architecture](docs/CODEMAPS/architecture.md)
- [Backend Structure](docs/CODEMAPS/backend.md)
- [Frontend Structure](docs/CODEMAPS/frontend.md)
- [Data Models](docs/CODEMAPS/data.md)

## Documentation

- `utils/crawler.ts`: Core scraper logic for Limitless TCG.
- `components/MetaTable.tsx`: Interactive dashboard for meta data.

## License

Private / MIT (Check LICENSE file if available)
