import { Column } from "@tanstack/react-table";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils/utils";

interface SortableHeaderProps<TData, TValue> {
  column: Column<TData, TValue>;
  title: string;
}

export const SortableHeader = <TData, TValue>({
  column,
  title,
}: SortableHeaderProps<TData, TValue>) => {
  const isSorted = column.getIsSorted();
  const sortState =
    isSorted === "asc"
      ? "ascending"
      : isSorted === "desc"
        ? "descending"
        : "none";

  return (
    <Button
      variant="ghost"
      size="sm"
      aria-label={`Sort by ${title}, currently ${sortState}`}
      className={cn(
        "data-[state=open]:bg-accent -ml-3 h-8",
        isSorted && "text-foil font-semibold",
      )}
      onClick={() => column.toggleSorting(isSorted === "asc")}
    >
      <span>{title}</span>
      {isSorted === "desc" ? (
        <ArrowDown aria-hidden="true" className="ml-2 h-3.5 w-3.5" />
      ) : isSorted === "asc" ? (
        <ArrowUp aria-hidden="true" className="ml-2 h-3.5 w-3.5" />
      ) : (
        <ArrowUpDown
          aria-hidden="true"
          className="ml-2 h-3.5 w-3.5 opacity-50"
        />
      )}
    </Button>
  );
};
