# Architecture Codemap

**Last Updated:** 2026-02-02
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

## Key Files

- `app/page.tsx`: Server Component entry point.
- `utils/crawler.ts`: Core data extraction logic.
- `components/MetaTable.tsx`: Client-side interactive data table.

## Data Flow

1. User requests `/`.
2. `app/page.tsx` (Server Component) calls `getMeta()` from `utils/crawler.ts`.
3. `crawler.ts` fetches HTML from Limitless TCG and parses it into structured `ParsedMetaRow` objects.
4. Data is passed to `MetaTable.tsx` for rendering and client-side filtering/sorting.
