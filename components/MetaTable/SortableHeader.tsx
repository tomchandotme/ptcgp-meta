import { Column } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SortableHeaderProps<TData, TValue> {
  column: Column<TData, TValue>;
  title: string;
}

export const SortableHeader = <TData, TValue>({
  column,
  title,
}: SortableHeaderProps<TData, TValue>) => (
  <Button
    variant="ghost"
    size="sm"
    className="data-[state=open]:bg-accent -ml-3 h-8"
    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  >
    <span>{title}</span>
    <ArrowUpDown className="ml-2 h-3 w-3" />
  </Button>
);
