"use client";

import { useMemo } from "react";
import {
  SortingState,
  Updater,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Search, X } from "lucide-react";
import {
  parseAsInteger,
  parseAsString,
  parseAsStringLiteral,
  throttle,
  useQueryStates,
} from "nuqs";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ParsedMetaRow } from "@/utils/crawler";
import { columns } from "./columns";
import { cn, parseDeckName } from "@/utils/utils";

const SORTABLE_COLUMNS = [
  "count",
  "sharePercent",
  "total",
  "winPercent",
] as const;

type SortableColumn = (typeof SORTABLE_COLUMNS)[number];

const DEFAULT_SORT_ID: SortableColumn = "sharePercent";
const DEFAULT_SORT_DIR = "desc" as const;
const DEFAULT_MIN_APPEARANCE = 10;

const urlReplaceThrottle = {
  history: "replace" as const,
  limitUrlUpdates: throttle(300),
  clearOnDefault: true,
};

// Parsers must be module-scope so useQueryStates keeps a stable keyMap.
const tableParsers = {
  q: parseAsString.withDefault("").withOptions(urlReplaceThrottle),
  min: parseAsInteger
    .withDefault(DEFAULT_MIN_APPEARANCE)
    .withOptions(urlReplaceThrottle),
  sort: parseAsStringLiteral(SORTABLE_COLUMNS)
    .withDefault(DEFAULT_SORT_ID)
    .withOptions({ clearOnDefault: true, history: "replace" }),
  dir: parseAsStringLiteral(["asc", "desc"] as const)
    .withDefault(DEFAULT_SORT_DIR)
    .withOptions({ clearOnDefault: true, history: "replace" }),
};

function isSortableColumn(id: string): id is SortableColumn {
  return (SORTABLE_COLUMNS as readonly string[]).includes(id);
}

export function MetaTable({ data }: { data: ParsedMetaRow[] }) {
  const [filters, setFilters] = useQueryStates(tableParsers);
  const { q: searchTerm, min: minAppearance, sort, dir } = filters;

  const sorting = useMemo<SortingState>(
    () => [{ id: sort, desc: dir === "desc" }],
    [sort, dir],
  );

  const setSorting = (updater: Updater<SortingState>) => {
    const next = typeof updater === "function" ? updater(sorting) : updater;
    const first = next[0];
    if (!first || !isSortableColumn(first.id)) {
      void setFilters({
        sort: DEFAULT_SORT_ID,
        dir: DEFAULT_SORT_DIR,
      });
      return;
    }
    void setFilters({
      sort: first.id,
      dir: first.desc ? "desc" : "asc",
    });
  };

  const placeholder = useMemo(() => {
    const topPokemons = data.slice(0, 2).map((v) => parseDeckName(v.deck)[0]);

    return `Ex: ${topPokemons.join(", ")}...`;
  }, [data]);

  const filteredData = useMemo(() => {
    return data.filter((row) => {
      const matchesAppearance = (row.count ?? 0) >= minAppearance;
      const matchesSearch = row.deck
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      return matchesAppearance && matchesSearch;
    });
  }, [data, minAppearance, searchTerm]);

  const table = useReactTable({
    data: filteredData,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  const hasRows = table.getRowModel().rows.length > 0;
  const canClearFilters =
    searchTerm !== "" || minAppearance !== DEFAULT_MIN_APPEARANCE;

  return (
    <div className="w-full space-y-6">
      <div className="grid gap-6 border-b pb-5 md:grid-cols-2">
        <div className="space-y-3">
          <div className="space-y-1">
            <label
              htmlFor="search-decks"
              className="text-sm leading-none font-semibold tracking-tight"
            >
              Search
            </label>
            <p className="text-muted-foreground text-xs">
              Pokémon or deck name.
            </p>
          </div>
          <div className="relative">
            <Search
              aria-hidden="true"
              className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2"
            />
            <Input
              id="search-decks"
              placeholder={placeholder}
              value={searchTerm}
              onChange={(e) => void setFilters({ q: e.target.value })}
              className="pr-9 pl-9"
            />
            {searchTerm && (
              <Button
                variant="ghost"
                size="icon"
                aria-label="Clear search"
                className="absolute top-1/2 right-1 h-7 w-7 -translate-y-1/2 hover:bg-transparent"
                onClick={() => void setFilters({ q: "" })}
              >
                <X className="text-muted-foreground h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        <div className="space-y-3">
          <div className="space-y-1">
            <label
              htmlFor="min-appearance"
              className="text-sm leading-none font-semibold tracking-tight"
            >
              Minimum appearances
            </label>
            <p className="text-muted-foreground text-xs">
              Hide decks below {minAppearance} events.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Slider
              id="min-appearance"
              min={0}
              max={50}
              step={5}
              value={[minAppearance]}
              onValueChange={(values) =>
                void setFilters({
                  min: values[0] ?? minAppearance,
                })
              }
              className="flex-1"
            />
            <span className="bg-muted w-10 rounded-md py-1 text-center font-mono text-sm font-bold tabular-nums">
              {minAppearance}
            </span>
          </div>
        </div>
      </div>

      <div className="bg-card relative w-full max-w-full overflow-hidden rounded-lg border max-md:overflow-x-auto max-md:overscroll-x-contain">
        <Table className="min-w-[42rem]">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-transparent">
                {headerGroup.headers.map((header) => {
                  const sorted = header.column.getIsSorted();
                  const ariaSort =
                    sorted === "asc"
                      ? "ascending"
                      : sorted === "desc"
                        ? "descending"
                        : header.column.getCanSort()
                          ? "none"
                          : undefined;
                  const isDeck = header.column.id === "deck";

                  return (
                    <TableHead
                      key={header.id}
                      className={cn(
                        "bg-muted/95 h-10 py-2",
                        isDeck && "min-w-48",
                      )}
                      aria-sort={ariaSort}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {hasRows ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} className="group">
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={cn(
                        "py-3",
                        cell.column.id === "deck" && "min-w-48",
                      )}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-36 text-center"
                >
                  <p className="text-foreground font-medium">
                    No decks match these filters
                  </p>
                  <p className="text-muted-foreground mt-1 text-sm">
                    Clear search or lower the appearance minimum.
                  </p>
                  {canClearFilters ? (
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-4"
                      onClick={() =>
                        void setFilters({
                          q: "",
                          min: DEFAULT_MIN_APPEARANCE,
                        })
                      }
                    >
                      Clear filters
                    </Button>
                  ) : null}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
