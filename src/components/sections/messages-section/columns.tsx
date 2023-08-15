"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellActions from "@/components/sections/messages-section/cell-actions";
import { TableFilterKeys } from "@/type";
import Link from "next/link";
import routes from "@/constants/routes";

export type MessageColumn = {
  id: string;
  sender: string;
  title: string;
  seen: boolean;
  createdAt: string;
};

export const filterKeys: TableFilterKeys<MessageColumn> = [
  {
    accessorKey: "sender",
    label: "From",
  },
  {
    accessorKey: "title",
    label: "Subject",
  },
  {
    accessorKey: "createdAt",
    label: "Recieved at",
  },
];

export const columns: ColumnDef<MessageColumn>[] = [
  {
    accessorKey: "sender",
    header: "From",
  },
  {
    accessorKey: "title",
    header: "Subject",
    cell: ({ row }) => <SubjectCell data={row.original} />,
  },
  {
    accessorKey: "createdAt",
    header: "Recieved at",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellActions />,
  },
];

const SubjectCell = ({ data }: { data: MessageColumn }) => {
  return (
    <Link
      href={`${routes.userMessage}/${data.id}`}
      className="hover:underline focus-visible:underline"
    >
      {data.title}
    </Link>
  );
};
