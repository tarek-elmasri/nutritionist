"use client";

import logo from "@/assets/logo.png";
import Image from "next/image";

const Sidebar = ({
  tabs: ChildrenTabs,
}: {
  tabs: (
    props: { onClick: () => void } | Record<string, unknown>
  ) => JSX.Element;
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
