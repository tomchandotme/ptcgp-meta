# Frontend Codemap

**Last Updated:** 2026-08-02
**Framework:** Next.js 16 (App Router) / React 19

## Component Hierarchy

- `app/layout.tsx`: Root layout with `ThemeProvider`.
- `app/page.tsx`: Main landing page (Server Component); calls `getPageData()`.
  - `Header.tsx`: Navigation and `ThemeToggle`.
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
- **Icons**: `lucide-react`.
- **Theming**: `next-themes` for dark/light/system mode (`ThemeToggle` uses `resolvedTheme`).

## State Management

- **Client State**: `MetaTable` manages `sorting`, `minAppearance`, and `searchTerm` filter state using React `useState`.
- **Server Data**: Pre-fetched in `app/page.tsx` via `getPageData()` and passed as props.
