"use client";

import type { SubscriptionPlan } from "@prisma/client";
import Image, { type StaticImageData } from "next/image";
import type { FC } from "react";
import separator from "@/assets/separator.svg";
import { cn } from "@/lib/utils";

interface SubScriptionPlanCardProps {
  tag?: string;
  plan: SubscriptionPlan;
  selected?: boolean;
  onClick?: () => void;
}

const SubscriptionPlanCard: FC<SubScriptionPlanCardProps> = ({
  tag = "most popular",
  plan,
  selected = false,
  onClick,
}) => {
  return (
    <div className="w-full max-w-[16rem] ">
      {/* tag */}
      <div className="relative z-10 w-4/6 mx-auto rounded-xl h-10 flex justify-center items-center bg-darkred">
        <p className="text-neutral-100 text-sm capitalize">{tag}</p>
      </div>

      <div
        onClick={onClick}
        className={cn(
          "relative z-0 bg-background hover:bg-lightgreen/30 ring-primary hover:ring-2 focus-visible:bg-lightgreen/30 focus-visible:ring-2 cursor-pointer rounded-2xl shadow-[-5px_5px_5px_0px] shadow-neutral-300 border-2 border-neutral-200 pb-6 pt-8 px-3 translate-y-[-1.25rem]",
          selected && "ring-2 ring-primary bg-lightgreen/30"
        )}
      >
        <div className="flex flex-col w-full items-center gap-3">
          <p className="font-bold text-lg">{plan.label}</p>
          <Image src={separator as StaticImageData} alt="" />
          <div className="space-y-1">
            <p className="text-3xl font-bold text-primary text-center">
              {plan.price > 0 ? " $ " + plan.price : "FREE"}
            </p>
            <p className="text-sm text-muted-foreground text-center">
              per {plan.per}
            </p>
          </div>

          <p className="text-sm">{plan.description}</p>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPlanCard;
