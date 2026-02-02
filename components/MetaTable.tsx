/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useMemo } from "react";
import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { ParsedMetaRow } from "@/utils/crawler";

export const columns: ColumnDef<ParsedMetaRow>[] = [
  {
    accessorKey: "position",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          size="sm"
          className="data-[state=open]:bg-accent -ml-3 h-8"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span>Rank</span>
          <ArrowUpDown className="ml-2 h-3 w-3" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="text-muted-foreground pl-4 font-mono text-xs">
        {row.getValue("position")}
      </div>
    ),
  },
  {
    accessorKey: "deck",
    header: "Deck",
    cell: ({ row }) => {
      const images: string[] = row.original.pokemonImages || [];
      return (
        <div className="flex items-center gap-3 py-1">
          <div className="flex -space-x-3">
            {images.map((src, i) => (
              <div
                key={i}
                className="border-background bg-muted relative h-10 w-10 overflow-hidden rounded-full border-2 shadow-sm transition-transform hover:z-10 hover:scale-110"
              >
                <img
                  src={src}
                  alt=""
                  className="h-full w-full object-scale-down object-bottom"
                />
              </div>
            ))}
          </div>
          <span className="font-semibold tracking-tight">
            {row.getValue("deck")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "count",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          size="sm"
          className="data-[state=open]:bg-accent -ml-3 h-8"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span>Count</span>
          <ArrowUpDown className="ml-2 h-3 w-3" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="text-center font-medium">{row.getValue("count")}</div>
    ),
  },
  {
    accessorKey: "sharePercent",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          size="sm"
          className="data-[state=open]:bg-accent -ml-3 h-8"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span>Share</span>
          <ArrowUpDown className="ml-2 h-3 w-3" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const val = parseFloat(row.getValue("sharePercent"));
      return (
        <div className="text-muted-foreground text-center">
          {val.toFixed(1)}%
        </div>
      );
    },
  },
  {
    accessorKey: "winPercent",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          size="sm"
          className="data-[state=open]:bg-accent -ml-3 h-8"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span>Win Rate</span>
          <ArrowUpDown className="ml-2 h-3 w-3" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const val = parseFloat(row.getValue("winPercent"));
      if (isNaN(val))
        return <div className="text-muted-foreground text-center">-</div>;
      return (
        <div className="text-center">
          <Badge
            variant="outline"
            className={
              val >= 50
                ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                : "border-orange-500/50 bg-orange-500/10 text-orange-600 dark:text-orange-400"
            }
          >
            {val.toFixed(1)}%
          </Badge>
        </div>
      );
    },
  },
];

export function MetaTable({ data }: { data: ParsedMetaRow[] }) {
  const [sorting, setSorting] = useState<SortingState>([
    { id: "sharePercent", desc: true },
  ]);
  const [minAppearance, setMinAppearance] = useState(10);

  const filteredData = useMemo(() => {
    return data.filter((row) => (row.count ?? 0) >= minAppearance);
  }, [data, minAppearance]);

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
      <div className="bg-card flex flex-col items-start justify-between gap-4 rounded-lg border p-4 sm:flex-row sm:items-center">
        <div className="space-y-1">
          <label
            htmlFor="min-appearance"
            className="text-sm leading-none font-medium"
          >
            Minimum Appearances
          </label>
          <p className="text-muted-foreground text-xs">
            Filtering out decks with fewer than {minAppearance} entries.
          </p>
        </div>
        <div className="flex w-full items-center gap-4 sm:w-64">
          <Slider
            id="min-appearance"
            min={0}
            max={50}
            step={1}
            value={[minAppearance]}
            onValueChange={(values) => setMinAppearance(values[0])}
            className="flex-1"
          />
          <span className="w-8 text-right font-mono text-sm">
            {minAppearance}
          </span>
        </div>
      </div>

      <div className="bg-card overflow-hidden rounded-xl border shadow-sm">
        <Table>
          <TableHeader className="bg-muted/50">
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
                  No decks match the current filter.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
