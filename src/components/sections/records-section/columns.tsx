"use client";

import { TableFilterKeys } from "@/type";
import { ColumnDef } from "@tanstack/react-table";

export type RecordColumn = {
  id: string;
  weight: string;
  height: string;
  createdAt: string;
};

export const filterKeys: TableFilterKeys<RecordColumn> = [
  {
    accessorKey: "weight",
    label: "Weight",
  },
  {
    accessorKey: "height",
    label: "Height",
  },
  {
    accessorKey: "createdAt",
    label: "Created At",
  },
];

export const columns: ColumnDef<RecordColumn>[] = [
  {
    accessorKey: "weight",
    header: "Weight",
  },
  {
    accessorKey: "height",
    header: "Height",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
];
