/* eslint-disable @next/next/no-img-element */
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { ParsedMetaRow } from "@/utils/crawler";
import { getWinRateColor } from "@/utils/utils";
import { SortableHeader } from "./SortableHeader";

export const columns: ColumnDef<ParsedMetaRow>[] = [
  {
    accessorKey: "deck",
    header: "Deck",
    cell: ({ row }) => {
      const images: string[] = row.original.pokemonImages || [];
      const deck: string = row.original.deck;
      const deckUrl: string = row.original.deckUrl || "#";
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
          <a href={deckUrl} target="_blank">
            <span className="font-semibold tracking-tight">{deck}</span>
          </a>
        </div>
      );
    },
  },
  {
    accessorKey: "count",
    header: ({ column }) => <SortableHeader column={column} title="Count" />,
    cell: ({ row }) => {
      const val = row.getValue("count");
      return (
        <div className="text-center font-mono font-medium">
          {typeof val === "number" ? val : "-"}
        </div>
      );
    },
  },
  {
    accessorKey: "sharePercent",
    header: ({ column }) => <SortableHeader column={column} title="Share" />,
    cell: ({ row }) => {
      const val = parseFloat(row.getValue("sharePercent"));
      if (isNaN(val))
        return <div className="text-muted-foreground text-center font-mono">-</div>;
      return (
        <div className="text-muted-foreground text-center font-mono">
          {val.toFixed(1)}%
        </div>
      );
    },
  },
  {
    accessorKey: "total",
    header: ({ column }) => <SortableHeader column={column} title="Matches" />,
    cell: ({ row }) => {
      const val = row.getValue("total");
      return (
        <div className="text-center font-mono font-medium">
          {typeof val === "number" ? val : 0}
        </div>
      );
    },
  },
  {
    accessorKey: "winPercent",
    header: ({ column }) => <SortableHeader column={column} title="Win Rate" />,
    cell: ({ row }) => {
      const val = parseFloat(row.getValue("winPercent"));
      if (isNaN(val))
        return <div className="text-muted-foreground text-center font-mono">-</div>;
      return (
        <div className="text-center font-mono">
          <Badge variant="outline" className={getWinRateColor(val)}>
            {val.toFixed(1)}%
          </Badge>
        </div>
      );
    },
  },
];
