"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellActions from "@/components/sections/require-actions/cell-actions";

export type RequireActionColumn = {
  profileId: string;
  name: string;
  nextPlanSchedule: string;
};

export const columns: ColumnDef<RequireActionColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "nextPlanSchedule",
    header: "Schedule Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellActions profileId={row.original.profileId} />,
  },
];
