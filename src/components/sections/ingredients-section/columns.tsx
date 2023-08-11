"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellActions from "@/components/sections/profiles-section/cell-actions";
import { ServeTypeKey, TableFilterKeys } from "@/type";

export type ItemColumn = {
  id: string;
  label: string;
  amount: number;
  unit: string;
  serveType: string;
};

export const filterKeys: TableFilterKeys<ItemColumn> = [
  {
    accessorKey: "label",
    label: "Name",
  },
  {
    accessorKey: "serveType",
    label: "Serve Category",
  },
];

export const columns: ColumnDef<ItemColumn>[] = [
  {
    accessorKey: "label",
    header: "Name",
  },
  {
    accessorKey: "amount",
    header: "Amount per serve",
  },
  {
    accessorKey: "unit",
    header: "Unit",
  },
  {
    accessorKey: "serveType",
    header: "Serve Type",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellActions />,
  },
];
