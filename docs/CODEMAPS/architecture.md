# Architecture Codemap

**Last Updated:** 2026-08-02
**Key Entry Point:** `app/page.tsx`

## Overview

This project is a Next.js 16 application optimized for the Bun runtime, designed to track Pokemon Trading Card Game Pocket (PTCGP) meta data by scraping `play.limitlesstcg.com`.

## High-Level Architecture

```
User -> [Frontend (Next.js/React)] -> [Crawler (cheerio/fetch)] -> [Limitless TCG]
```

## Core Components

- **Frontend**: Next.js App Router, Tailwind CSS 4, Radix UI, TanStack Table.
- **Backend/Logic**: Server-side crawling using `cheerio` to parse live meta data.
- **Deployment**: Next.js production build.
- **Linting**: oxlint + Prettier (husky / lint-staged).

## Key Files

- `app/page.tsx`: Server Component entry point.
- `utils/crawler.ts`: Core data extraction logic (`getPageData`).
- `components/MetaTable/`: Client-side interactive data table (index, columns, SortableHeader).

## Data Flow

1. User requests `/`.
2. `app/page.tsx` (Server Component) calls `getPageData()` from `utils/crawler.ts`.
3. `crawler.ts` fetches HTML once from Limitless TCG (`revalidate: 3600`) and parses both meta rows and the current set label.
4. Data is passed to `components/MetaTable/` for rendering and client-side search/filtering/sorting.
