"use client";

import { Apple, FileStack, LayoutGrid, LogOut, Mail } from "lucide-react";
import SidebarTap from "./sidebar-tab";
import { TABS } from "@/constants";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import PageLoader from "@/components/ui/page-loader";
import { signOut } from "next-auth/react";

const ConsoleTabs = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const tab = useSearchParams().get("tab") || TABS.PROFILES;

  const consolePath = pathname === "/console";

  const sidebarTabs = [
    {
      label: "Profiles",
      active: consolePath && tab === TABS.PROFILES,
      icon: FileStack,
      href: `/console?tab=${TABS.PROFILES}`,
    },
    {
      label: "Ingredients",
      active: consolePath && tab === TABS.INGREDIENTS,
      icon: Apple,
      href: `/console?tab=${TABS.INGREDIENTS}`,
    },
    {
      label: "Messages",
      active: consolePath && tab === TABS.MESSAGES,
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
      <SidebarTap
        key={"signout"}
        label="Sign Out"
        icon={LogOut}
        onClick={() => startTransition(() => signOut())}
      />
    </>
  );
};

export default ConsoleTabs;
