"use client";

import {
  BarChart3,
  FileStack,
  LayoutGrid,
  LogOut,
  Mail,
  TrendingUp,
} from "lucide-react";
import SidebarTap from "./sidebar-tab";
import { TABS } from "@/constants";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import PageLoader from "../ui/page-loader";
import { signOut } from "next-auth/react";

const UserTabs = ({ onClick }: { onClick?: () => void }) => {
  const router = useRouter();
  const pathname = usePathname();
  const tab = useSearchParams().get("tab") || TABS.ACTIVE_PLANS;
  const [isPending, startTransition] = useTransition();

  const profilePath = pathname === "/profile";

  const userTabs = [
    {
      label: "Diet Plans",
      active: profilePath && tab === TABS.ACTIVE_PLANS,
      icon: LayoutGrid,
      href: `/profile?tab=${TABS.ACTIVE_PLANS}`,
    },
    {
      label: "Progress",
      active: profilePath && tab === TABS.PROGRESS,
      icon: TrendingUp,
      href: `/profile?tab=${TABS.PROGRESS}`,
    },
    {
      label: "Archived Plans",
      active: profilePath && tab === TABS.HISTORY,
      icon: FileStack,
      href: `/profile?tab=${TABS.HISTORY}`,
    },
    {
      label: "Messages",
      active: profilePath && tab === TABS.MESSAGES,
      icon: Mail,
      href: `/profile?tab=${TABS.MESSAGES}`,
    },
    // {
    //   label: "Settings",
    //   active: profilePath && tab === TABS.SETTINGS,
    //   icon: LayoutGrid,
    //   href: `/profile?tab=${TABS.SETTINGS}`,
    // },
  ];
  return (
    <>
      {isPending && <PageLoader />}
      {userTabs.map(({ label, active, icon, href }) => (
        <li key={label}>
          <SidebarTap
            key={label}
            label={label}
            isSelected={active}
            icon={icon}
            onClick={() =>
              startTransition(() => {
                onClick && onClick();
                router.push(href);
              })
            }
          />
        </li>
      ))}
      <li>
        <SidebarTap
          key={"signout"}
          label="Sign Out"
          icon={LogOut}
          onClick={() => startTransition(() => signOut())}
        />
      </li>
    </>
  );
};

export default UserTabs;
