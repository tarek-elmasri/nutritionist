"use client";

import { Apple, LayoutGrid, Mail } from "lucide-react";
import SidebarTap from "./sidebar-tab";
import { TABS } from "@/constants";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import PageLoader from "@/components/ui/page-loader";

const ConsoleTabs = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
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
    {
      label: "Messages",
      active: tab === TABS.MESSAGES,
      icon: Mail,
      href: `/console?tab=${TABS.MESSAGES}`,
    },
  ];
  return (
    <>
      {isPending && <PageLoader />}
      {sidebarTabs.map(({ label, active, icon, href }) => (
        <SidebarTap
          key={label}
          label={label}
          isSelected={active}
          icon={icon}
          onClick={() => startTransition(() => router.push(href))}
        />
      ))}
    </>
  );
};

export default ConsoleTabs;
