"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { ComponentRef, forwardRef } from "react";
import separatorImg from "@/assets/separator.svg";

const Separator = forwardRef<ComponentRef<"img">, { className?: string }>(
  ({ className }, ref) => (
    <Image
      ref={ref}
      src={separatorImg}
      alt=""
      className={cn("py-6", className)}
    />
  )
);

Separator.displayName = "Separator";

export default Separator;
