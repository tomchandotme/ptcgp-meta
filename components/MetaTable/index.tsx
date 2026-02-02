"use client";

import { useState, useMemo } from "react";
import {
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Slider } from "@/components/ui/slider";
import { ParsedMetaRow } from "@/utils/crawler";
import { columns } from "./columns";

export function MetaTable({ data }: { data: ParsedMetaRow[] }) {
  "use no memo";

  const [sorting, setSorting] = useState<SortingState>([
    { id: "sharePercent", desc: true },
  ]);
  const [minAppearance, setMinAppearance] = useState(10);

  const filteredData = useMemo(() => {
    return data.filter((row) => (row.count ?? 0) >= minAppearance);
  }, [data, minAppearance]);

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
            step={5}
            value={[minAppearance]}
            onValueChange={(values) => setMinAppearance(values[0])}
            className="flex-1"
          />
          <span className="w-8 text-right font-mono text-sm">
            {minAppearance}
          </span>
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
