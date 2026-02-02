# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `bun dev`: Start Next.js development server
- `bun run build`: Build for production
- `bun lint`: Run ESLint check
- `bun format`: Format code with Prettier
- `bun x next lint`: Alternative lint command
- `bun x tsc --noEmit`: Run TypeScript type check

## Architecture

This is a Next.js (App Router) project focused on tracking Pokémon Trading Card Game Pocket (PTCGP) meta data, optimized for the Bun runtime.

- **Frontend**: Next.js 16 with React 19 and Tailwind CSS 4.
- **Crawler Logic**: Core parsing logic resides in `utils/crawler.ts`. It fetches HTML from `play.limitlesstcg.com` and scrapes it using `cheerio` and `lodash`.
- **Data Flow**:
  - `app/page.tsx` is a server component that calls `getMeta()` from the crawler utility.
  - The fetched meta data is passed to the view (currently rendered as raw JSON).
- **Key Files**:
  - `utils/crawler.ts`: Scraper implementation for the Limitless TCG meta site.
  - `app/page.tsx`: Main page entry point.
  - `eslint.config.mjs`: Modern ESLint flat configuration.
