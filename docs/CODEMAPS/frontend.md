# Frontend Codemap

**Last Updated:** 2026-02-02
**Framework:** Next.js 16 (App Router) / React 19

## Component Hierarchy

- `app/layout.tsx`: Root layout with `ThemeProvider`.
- `app/page.tsx`: Main landing page (Server Component).
  - `Header.tsx`: Navigation and `ThemeToggle`.
  - `MetaTable.tsx`: Main interactive data component (Client Component).
    - `ui/table.tsx`: Presentational table components.
    - `ui/slider.tsx`: Filtering control for minimum appearances.
    - `ui/badge.tsx`: Win rate status indicators.

## Key Technologies

- **UI Components**: Tailwind CSS 4, Radix UI primitives.
- **Data Tables**: `@tanstack/react-table` for sorting and structure.
- **Icons**: `lucide-react`.
- **Theming**: `next-themes` for dark/light mode support.

## State Management

- **Client State**: `MetaTable.tsx` manages `sorting` and `minAppearance` filter state using React `useState`.
- **Server Data**: Pre-fetched in `app/page.tsx` and passed as props.
