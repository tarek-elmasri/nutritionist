"use client";

import { TABS } from "@/constants";
import { useSearchParams } from "next/navigation";

const UserView = () => {
  const tab = useSearchParams().get("tab") ?? TABS.PROFILES;
  return <div>UserView</div>;
};

export default UserView;
