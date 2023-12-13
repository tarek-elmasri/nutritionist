"use client";

import { cn } from "@/lib/utils";
import Image, { type StaticImageData } from "next/image";
import { type ComponentRef, forwardRef } from "react";
import separatorImg from "@/assets/separator.svg";

const Separator = forwardRef<ComponentRef<"img">, { className?: string }>(
  ({ className }, ref) => (
    <Image
      ref={ref}
      src={separatorImg as StaticImageData}
      alt=""
      className={cn("py-6", className)}
    />
  )
);

Separator.displayName = "Separator";

export default Separator;
