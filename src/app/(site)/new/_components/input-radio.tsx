"use client";

import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import type { FC } from "react";

interface InputRadioProps {
  icon: LucideIcon;
  name: string;
  value: string;
  label: string;
  isSelected: boolean;
  onChange: (value: string) => void;
}

const InputRadio: FC<InputRadioProps> = ({
  icon: Icon,
  name,
  value,
  label,
  onChange,
  isSelected,
}) => {
  return (
    <>
      <label className="sr-only" htmlFor={`option-${value}`}>
        {label}
      </label>
      <input
        className="sr-only"
        type="radio"
        id={`option-${value}`}
        name={name}
        value={value}
      />
      <div
        onClick={() => onChange(value)}
        className={cn(
          "w-full h-12 bg-lightgreen/30 flex rounded-lg overflow-hidden shadow-sm cursor-pointer ring-primary h",
          isSelected && "ring-2",
          !isSelected && "hover:ring-1"
        )}
        aria-hidden
      >
        <div className={cn("h-full flex items-center justify-center w-12")}>
          <Icon color="#000" size={18} />
        </div>
        <div className={cn("pl-6 flex-1 h-full flex items-center")}>
          <p className="">{label}</p>
        </div>
      </div>
    </>
  );
};

export default InputRadio;
