"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TableFilterKeys } from "@/type";
import { cn } from "@/lib/utils";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
  filterKeys,
  seenKey,
}: DataTableProps<TData, TValue> & {
  filterKeys?: TableFilterKeys<TData>;
  seenKey?: keyof TData;
}) {
  const [currentPage, setCurrentPage] = useState(0);

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [searchKey, setSearchKey] = useState(filterKeys?.[0]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      pagination: { pageSize: 5, pageIndex: currentPage },
      columnFilters,
    },
  });

  return (
    <div>
      {/* Filtering */}
      {filterKeys && searchKey && (
        <div className="flex flex-col gap-4 md:flex-row justify-start items-start md:items-center py-4">
          <Input
            placeholder="Search"
            value={
              (table
                .getColumn(searchKey.accessorKey as string)
                ?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table
                .getColumn(searchKey.accessorKey as string)
                ?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />

          <Select
            defaultValue={searchKey?.accessorKey as string}
            onValueChange={(value) =>
              setSearchKey(
                filterKeys.find((filter) => filter.accessorKey === value)
              )
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Search By" />
            </SelectTrigger>
            <SelectContent>
              {filterKeys.map(
                (option) =>
                  option.accessorKey !== "actions" && (
                    <SelectItem
                      key={option.accessorKey as string}
                      value={option.accessorKey as string}
                    >
                      {option.label}
                    </SelectItem>
                  )
              )}
            </SelectContent>
          </Select>
        </div>
      )}
      <div className="rounded-md border border-primary">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
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
                  className={cn(
                    seenKey &&
                      !row.original[seenKey] &&
                      "bg-lightgreen/40 hover:bg-lightgreen data-[state=selected]:bg-lightgreen"
                  )}
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage((prev) => prev - 1)}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
