"use client";

import { useRouter } from "next/navigation";
import { DietPlanColumn } from "./columns";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import PageLoader from "@/components/ui/page-loader";

const CellActions = ({ data }: { data: DietPlanColumn }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  return (
    <>
      {isPending && <PageLoader />}
      <Button
        size={"sm"}
        type="button"
        onClick={() => startTransition(() => router.push(data.href))}
      >
        View
      </Button>
    </>
  );
};

export default CellActions;
