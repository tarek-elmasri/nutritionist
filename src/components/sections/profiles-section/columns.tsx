"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellActions from "@/components/sections/profiles-section/cell-actions";
import { Gender, Goal } from "@/type";

export type ProfilesColumn = {
  id: string;
  name: string;
  age: number;
  gender: Gender;
  createdAt: string;
};

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
    cell: ({ row }) => <CellActions />,
  },
];
