"use client";

import type { ColumnDef } from "@tanstack/react-table";
import CellActions from "@/components/sections/messages-section/outbox-cell-actions";
import type { TableFilterKeys } from "@/type";
import Link from "next/link";

export type MessageColumn = {
  id: string;
  senderId: string;
  reciever: string;
  title: string;
  href: string;
  createdAt: string;
};

export const filterKeys: TableFilterKeys<MessageColumn> = [
  {
    accessorKey: "reciever",
    label: "To",
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
    accessorKey: "reciever",
    header: "To",
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
    cell: ({ row }) => <CellActions data={row.original} />,
  },
];

const SubjectCell = ({ data }: { data: MessageColumn }) => {
  return (
    <Link
      href={`${data.href}/${data.id}`}
      className="hover:underline focus-visible:underline"
    >
      {data.title}
    </Link>
  );
};
