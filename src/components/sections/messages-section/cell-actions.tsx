"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { useTransition } from "react";
import PageLoader from "@/components/ui/page-loader";
import { useRouter } from "next/navigation";
import { MessageColumn } from "./columns";

const CellActions = ({ data: { id, href } }: { data: MessageColumn }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleNavigation = (link: string) => {
    startTransition(() => router.push(link));
  };

  return (
    <>
      {isPending && <PageLoader />}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem
            className="flex-row"
            onClick={() => handleNavigation(`${href}/${id}`)}
          >
            View
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex-row"
            onClick={() => handleNavigation(`${href}/${id}/reply`)}
          >
            Reply
          </DropdownMenuItem>
          <DropdownMenuItem className="flex-row">Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default CellActions;
