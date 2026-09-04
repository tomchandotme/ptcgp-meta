"use client";

import Image from "next/image";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { ParsedMetaRow } from "@/utils/crawler";
import { cn, getWinRateColor, parseDeckName } from "@/utils/utils";
import { SortableHeader } from "./SortableHeader";

export const columns: ColumnDef<ParsedMetaRow>[] = [
  {
    accessorKey: "deck",
    header: "Deck",
    cell: ({ row }) => {
      const images: string[] = row.original.pokemonImages || [];
      const deck: string = row.original.deck;
      const deckUrl = row.original.deckUrl;
      const pokemonNames = parseDeckName(deck);

      const nameContent = pokemonNames.map((name, i) => (
        <span
          key={i}
          className={
            i === 0
              ? "font-display text-foreground text-lg leading-none font-semibold tracking-tight"
              : "text-muted-foreground text-sm leading-none font-medium"
          }
        >
          {name}
        </span>
      ));

      return (
        <div className="flex min-w-0 items-center gap-3 py-1">
          <div className="flex h-14 w-16 shrink-0 items-center justify-center -space-x-3">
            {images.map((src, i) => (
              <div
                key={i}
                className={cn(
                  "relative size-10 overflow-hidden drop-shadow motion-safe:transition-transform motion-safe:hover:z-10 motion-safe:hover:scale-110",
                  {
                    "-mr-4 mb-4": images.length === 2 && i === 0,
                    "mt-4": images.length === 2 && i === 1,
                  },
                )}
              >
                <Image
                  src={src}
                  alt={pokemonNames[i] ?? deck}
                  width={40}
                  height={40}
                  className="h-full w-full object-scale-down object-bottom"
                  unoptimized
                />
              </div>
            ))}
          </div>
          {deckUrl ? (
            <a
              href={deckUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-visible:ring-ring flex flex-col gap-0.5 rounded-sm hover:underline focus-visible:ring-2 focus-visible:outline-none"
            >
              {nameContent}
            </a>
          ) : (
            <div className="flex flex-col gap-0.5">{nameContent}</div>
          )}
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
        return (
          <div className="text-muted-foreground text-center font-mono">-</div>
        );
      return (
        <div className="flex flex-col items-center gap-1.5">
          <span className="font-mono text-sm tabular-nums">
            {val.toFixed(1)}%
          </span>
          <div
            className="bg-muted h-1 w-16 overflow-hidden rounded-full"
            aria-hidden="true"
          >
            <div
              className="bg-energy h-full rounded-full"
              style={{ width: `${val > 0 ? Math.max(val, 4) : 0}%` }}
            />
          </div>
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
          {typeof val === "number" ? val : "-"}
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
        return (
          <div className="text-muted-foreground text-center font-mono">-</div>
        );
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
