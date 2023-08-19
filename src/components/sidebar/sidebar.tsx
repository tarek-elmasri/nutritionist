"use client";

import Image from "next/image";
import logo from "@/assets/logo.png";
import ConsoleTabs from "./console-tabs";
import UserTabs from "./user-tabs";

const Sidebar = ({
  tabs: ChildrenTabs,
}: {
  tabs: typeof ConsoleTabs | typeof UserTabs;
}) => {
  return (
    <aside className="w-full h-full p-6 border-r-4 border-lightgreen max-w-[15rem] bg-background">
      <Image
        src={logo}
        alt="Aya Salem"
        className="w-32 mx-auto h-auto"
        priority
      />

      <ul className="mt-12 space-y-3">
        <ChildrenTabs />
      </ul>
    </aside>
  );
};

export default Sidebar;
