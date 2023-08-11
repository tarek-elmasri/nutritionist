"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellActions from "@/components/sections/profiles-section/cell-actions";
import { ServeTypeKey } from "@/type";

export type ItemColumn = {
  id: string;
  label: string;
  amount: number;
  unit: string;
  serveType: string;
};

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
