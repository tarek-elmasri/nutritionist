"use client";

import { useRouter } from "next/navigation";
import { DietPlanColumn } from "./columns";
import { Button } from "@/components/ui/button";

const CellActions = ({ data }: { data: DietPlanColumn }) => {
  const router = useRouter();

  return (
    <Button
      size={"sm"}
      type="button"
      onClick={() => router.push(`/profile/diets/${data.id}`)}
    >
      View
    </Button>
  );
};

export default CellActions;
