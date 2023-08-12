"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellActions from "./cell-actions";

export type DietPlanColumn = {
  id: string;
  endDate: string;
  createdAt: string;
};

export const columns: ColumnDef<DietPlanColumn>[] = [
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
  {
    accessorKey: "endDate",
    header: "Estimated Schedule",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellActions data={row.original} />,
  },
];
