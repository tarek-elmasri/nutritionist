"use client";

import type { ColumnDef } from "@tanstack/react-table";
import CellActions from "@/components/sections/profiles-section/cell-actions";
import type { Gender, TableFilterKeys } from "@/type";

export type ProfilesColumn = {
  id: string;
  userId: string;
  name: string;
  age: number;
  gender: Gender;
  createdAt: string;
};

export const filterKeys: TableFilterKeys<ProfilesColumn> = [
  {
    accessorKey: "name",
    label: "Name",
  },
  {
    accessorKey: "gender",
    label: "Gender",
  },
];

export const columns: ColumnDef<ProfilesColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "age",
    header: "Age",
  },
  {
    accessorKey: "gender",
    header: "Gender",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellActions profile={row.original} />,
  },
];
