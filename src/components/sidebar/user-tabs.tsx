"use client";

import { LayoutGrid } from "lucide-react";
import SidebarTap from "./sidebar-tab";
import { TABS } from "@/constants";
import { useRouter, useSearchParams } from "next/navigation";

const UserTabs = () => {
  const router = useRouter();
  const tab = useSearchParams().get("tab") || TABS.WEEKLY_PLAN;

  return (
    <>
      <SidebarTap
        label="Diet Plan"
        isSelected={tab === TABS.WEEKLY_PLAN}
        icon={LayoutGrid}
        onClick={() => router.push(`/profile?tab=${TABS.WEEKLY_PLAN}`)}
      />
      <SidebarTap
        label="Progress"
        isSelected={tab === TABS.PROGRESS}
        icon={LayoutGrid}
        onClick={() => router.push(`/profile?tab=${TABS.PROGRESS}`)}
      />
      <SidebarTap
        label="History"
        isSelected={tab === TABS.HISTORY}
        icon={LayoutGrid}
        onClick={() => router.push(`/profile?tab=${TABS.HISTORY}`)}
      />
      <SidebarTap
        label="Messages"
        isSelected={tab === TABS.MESSAGES}
        icon={LayoutGrid}
        onClick={() => router.push(`/profile?tab=${TABS.MESSAGES}`)}
      />
      <SidebarTap
        label="Settings"
        isSelected={tab === TABS.SETTINGS}
        icon={LayoutGrid}
        onClick={() => router.push(`/profile?tab=${TABS.SETTINGS}`)}
      />
    </>
  );
};

export default UserTabs;
