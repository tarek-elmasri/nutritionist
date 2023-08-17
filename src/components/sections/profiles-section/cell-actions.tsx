"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import PageLoader from "@/components/ui/page-loader";
import routes from "@/constants/routes";

const CellActions = ({
  profile,
}: {
  profile: { id: string; userId: string };
}) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
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
            onClick={() =>
              startTransition(() =>
                router.push(`${routes.consoleProfiles}/${profile.id}`)
              )
            }
          >
            View Profile
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex-row"
            onClick={() =>
              startTransition(() =>
                router.push(`${routes.consoleProfiles}/${profile.id}/diets/new`)
              )
            }
          >
            Create Plan
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex-row"
            onClick={() =>
              startTransition(() =>
                router.push(
                  `${routes.consoleMessage}/new?recieverId=${profile.userId}`
                )
              )
            }
          >
            Send Message
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default CellActions;
