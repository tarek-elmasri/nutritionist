"use client";

import type { TableFilterKeys } from "@/type";
import type { ColumnDef } from "@tanstack/react-table";

export type RecordColumn = {
  id: string;
  weight: string;
  height: string;
  bust: string;
  waist: string;
  abdominalGirth: string;
  hips: string;
  arm: string;
  thighs: string;
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
    accessorKey: "bust",
    header: "Bust",
  },
  {
    accessorKey: "waist",
    header: "Waist",
  },
  {
    accessorKey: "abdominalGirth",
    header: "Abdominal Girth",
  },
  {
    accessorKey: "hips",
    header: "Hips",
  },
  {
    accessorKey: "arm",
    header: "Arm",
  },
  {
    accessorKey: "thighs",
    header: "Thighs",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
];
