"use client";

import { useState, useMemo } from "react";
import {
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Search, X } from "lucide-react";

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

export function MetaTable({ data }: { data: ParsedMetaRow[] }) {
  "use no memo";

  const [sorting, setSorting] = useState<SortingState>([
    { id: "sharePercent", desc: true },
  ]);
  const [minAppearance, setMinAppearance] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = useMemo(() => {
    return data.filter((row) => {
      const matchesAppearance = (row.count ?? 0) >= minAppearance;
      const matchesSearch = row.deck
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      return matchesAppearance && matchesSearch;
    });
  }, [data, minAppearance, searchTerm]);

  // eslint-disable-next-line react-hooks/incompatible-library
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

  return (
    <div className="w-full space-y-6">
      <div className="bg-card flex flex-col items-stretch justify-between gap-6 rounded-xl border p-6 md:flex-row md:items-center">
        <div className="grid flex-1 gap-6 md:grid-cols-2">
          {/* Search Filter */}
          <div className="space-y-3">
            <div className="space-y-1">
              <label
                htmlFor="search-decks"
                className="text-sm leading-none font-semibold tracking-tight"
              >
                Search Decks
              </label>
              <p className="text-muted-foreground text-xs">
                Filter by deck name or Pokémon.
              </p>
            </div>
            <div className="relative">
              <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
              <Input
                id="search-decks"
                placeholder="Ex: Charizard, Mewtwo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-9 pl-9"
              />
              {searchTerm && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-1/2 right-1 h-7 w-7 -translate-y-1/2 hover:bg-transparent"
                  onClick={() => setSearchTerm("")}
                >
                  <X className="text-muted-foreground h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          {/* Appearance Filter */}
          <div className="space-y-3">
            <div className="space-y-1">
              <label
                htmlFor="min-appearance"
                className="text-sm leading-none font-semibold tracking-tight"
              >
                Minimum Appearances
              </label>
              <p className="text-muted-foreground text-xs">
                Filtering out decks with fewer than {minAppearance} entries.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Slider
                id="min-appearance"
                min={0}
                max={50}
                step={5}
                value={[minAppearance]}
                onValueChange={(values) => setMinAppearance(values[0])}
                className="flex-1"
              />
              <span className="bg-muted w-10 rounded-md py-1 text-center font-mono text-sm font-bold">
                {minAppearance}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-card relative max-h-200 overflow-auto rounded-xl border shadow-sm">
        <Table>
          <TableHeader className="bg-muted/50 sticky top-0 z-10 shadow-sm">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-transparent">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="h-10 py-2">
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
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="group"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-3">
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
                  className="text-muted-foreground h-32 text-center"
                >
                  No decks match the current filters.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
