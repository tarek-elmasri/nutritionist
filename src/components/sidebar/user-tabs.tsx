"use client";

import { LayoutGrid } from "lucide-react";
import SidebarTap from "./sidebar-tab";
import { TABS } from "@/constants";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import PageLoader from "../ui/page-loader";

const UserTabs = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const tab = useSearchParams().get("tab") || TABS.ACTIVE_PLANS;

  const userTabs = [
    {
      label: "Diet Plan",
      active: tab === TABS.ACTIVE_PLANS,
      icon: LayoutGrid,
      href: `/profile?tab=${TABS.ACTIVE_PLANS}`,
    },
    {
      label: "Progress",
      active: tab === TABS.PROGRESS,
      icon: LayoutGrid,
      href: `/profile?tab=${TABS.PROGRESS}`,
    },
    {
      label: "History",
      active: tab === TABS.HISTORY,
      icon: LayoutGrid,
      href: `/profile?tab=${TABS.HISTORY}`,
    },
    {
      label: "Messages",
      active: tab === TABS.MESSAGES,
      icon: LayoutGrid,
      href: `/profile?tab=${TABS.MESSAGES}`,
    },
    {
      label: "Settings",
      active: tab === TABS.SETTINGS,
      icon: LayoutGrid,
      href: `/profile?tab=${TABS.SETTINGS}`,
    },
  ];
  return (
    <>
      {isPending && <PageLoader />}
      {userTabs.map(({ label, active, icon, href }) => (
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

export default UserTabs;
