"use client";

import { Button } from "@/components/ui/button";
import PageLoader from "@/components/ui/page-loader";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

const NewPlanButton = ({ href }: { href: string }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <>
      {isPending && <PageLoader />}
      <Button
        size={"sm"}
        onClick={() => startTransition(() => router.push(href))}
      >
        New Plan
      </Button>
    </>
  );
};

export default NewPlanButton;
