"use client";

import { Apple, LayoutGrid } from "lucide-react";
import SidebarTap from "./sidebar-tab";
import { TABS } from "@/constants";
import { useRouter, useSearchParams } from "next/navigation";

const ConsoleTabs = () => {
  const router = useRouter();
  const tab = useSearchParams().get("tab") || TABS.PROFILES;

  const sidebarTabs = [
    {
      label: "Profiles",
      active: tab === TABS.PROFILES,
      icon: LayoutGrid,
      href: `console?tab=${TABS.PROFILES}`,
    },
    {
      label: "Ingredients",
      active: tab === TABS.INGREDIENTS,
      icon: Apple,
      href: `/console?tab=${TABS.INGREDIENTS}`,
    },
  ];
  return (
    <>
      {sidebarTabs.map(({ label, active, icon, href }) => (
        <SidebarTap
          key={label}
          label={label}
          isSelected={active}
          icon={icon}
          onClick={() => router.push(href)}
        />
      ))}
    </>
  );
};

export default ConsoleTabs;
