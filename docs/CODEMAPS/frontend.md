# Frontend Codemap

**Last Updated:** 2026-08-02
**Framework:** Next.js 16 (App Router) / React 19

## Component Hierarchy

- `app/layout.tsx`: Root layout with `ThemeProvider` and `Header` (`ThemeToggle`).
- `app/page.tsx`: Main landing page (Server Component); calls `getPageData()`.
  - `PageChrome.tsx`: Shared `PageShell` / `PageHeader` / `PageFooter`.
  - `components/MetaTable/`: Main interactive data component (Client Component).
    - `columns.tsx` / `SortableHeader.tsx`: Column definitions.
    - `ui/table.tsx`: Presentational table components.
    - `ui/slider.tsx`: Filtering control for minimum appearances.
    - `ui/input.tsx`: Deck name search.
    - `ui/badge.tsx`: Win rate status indicators.

## Key Technologies

- **UI Components**: Tailwind CSS 4, Radix UI primitives.
- **Data Tables**: `@tanstack/react-table` for sorting and structure.
- **URL State**: `nuqs` for shareable filter/sort query params.
- **Icons**: `lucide-react`.
- **Theming**: `next-themes` for dark/light/system mode (`ThemeToggle` uses `resolvedTheme`).

## State Management

- **URL State (`nuqs`)**: `MetaTable` syncs search (`q`), min appearances (`min`), and sort (`sort` / `dir`) via module-scoped `useQueryStates` parsers (`NuqsAdapter` in `app/layout.tsx`). Defaults are omitted from the URL.
- **Server Data**: Pre-fetched in `app/page.tsx` via `getPageData()` and passed as props. Filtering/sorting remain client-side.
