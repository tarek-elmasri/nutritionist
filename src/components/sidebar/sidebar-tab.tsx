"use client";

import type { FC } from "react";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface SidebarTapProps {
  onClick: () => void;
  isSelected?: boolean;
  label: string;
  icon: LucideIcon;
}

const SidebarTap: FC<SidebarTapProps> = ({
  label,
  icon: Icon,
  isSelected,
  onClick,
}) => (
  <div
    onClick={onClick}
    className={cn(
      "flex items-center rounded-lg gap-3 p-3 hover:bg-lightgreen/50 cursor-pointer",
      isSelected && "bg-lightgreen/50 shadow-md shadow-lightgreen"
    )}
  >
    {/* icon */}
    <Icon className={cn("w-6 h-6", isSelected && "text-primary font-bold")} />
    <p className={cn(isSelected && "font-bold text-primary")}>{label}</p>
  </div>
);

export default SidebarTap;
