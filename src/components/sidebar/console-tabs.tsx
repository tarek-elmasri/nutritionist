"use client";

import { LayoutGrid } from "lucide-react";
import SidebarTap from "./sidebar-tab";
import { TABS } from "@/constants";
import { useRouter, useSearchParams } from "next/navigation";

const ConsoleTabs = () => {
  const router = useRouter();
  const tab = useSearchParams().get("tab") || TABS.PROFILES;

  return (
    <>
      <SidebarTap
        label="Profiles"
        isSelected={tab === TABS.PROFILES}
        icon={LayoutGrid}
        onClick={() => router.push(`/profiles?tab=${TABS.PROFILES}`)}
      />
    </>
  );
};

export default ConsoleTabs;
