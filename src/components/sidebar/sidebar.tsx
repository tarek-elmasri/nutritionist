"use client";

import Image from "next/image";
import logo from "@/assets/logo.png";
import { ReactNode } from "react";

const Sidebar = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full h-full p-6 border-r-4 border-lightgreen max-w-[15rem] bg-background">
      <Image
        src={logo}
        alt="Aya Salem"
        className="w-32 mx-auto h-auto opacity-50"
        priority
      />

      <div className="mt-12 space-y-3">{children}</div>
    </div>
  );
};

export default Sidebar;
