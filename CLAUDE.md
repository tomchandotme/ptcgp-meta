# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `bun dev`: Start Next.js development server
- `bun run build`: Build for production
- `bun lint`: Run oxlint check
- `bun lint:fix`: Auto-fix oxlint issues where possible
- `bun format`: Format code with Prettier
- `bun format:check`: Check Prettier formatting
- `bun test`: Run Bun unit tests
- `bun typecheck`: Run TypeScript type check (`tsc --noEmit`)
- `bun check`: Run lint + typecheck + test

## Architecture

This is a Next.js (App Router) project focused on tracking Pokémon Trading Card Game Pocket (PTCGP) meta data, optimized for the Bun runtime.

- **Frontend**: Next.js 16 with React 19 and Tailwind CSS 4.
- **Crawler Logic**: Core parsing logic resides in `utils/crawler.ts`. It fetches HTML from `play.limitlesstcg.com` and scrapes it using `cheerio` (1h revalidate).
- **Data Flow**:
  - `app/page.tsx` is a server component that calls `getPageData()` from the crawler utility (single fetch for rows + current set).
  - The fetched meta data is passed to `components/MetaTable/` for interactive display, search, and filtering.
- **Documentation**:
  - Detailed codemaps are located in `docs/CODEMAPS/`.
- **Key Files**:
- `utils/crawler.ts`: Scraper implementation for the Limitless TCG meta site (`getPageData`, 1h revalidate; throws on failure).
- `app/page.tsx`: Main page entry point.
- `components/PageChrome.tsx`: Shared page shell/header/footer.
- `components/MetaTable/`: Interactive data table (index, columns, SortableHeader).
- `.oxlintrc.json`: Oxlint configuration (primary linter).
- `.github/workflows/ci.yml`: CI for lint, typecheck, and tests.
