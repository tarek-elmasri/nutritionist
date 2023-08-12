"use client";

import { TABS } from "@/constants";
import { useSearchParams } from "next/navigation";
import DietPlansSection from "@/components/sections/diet-plans-section";
import { FC } from "react";

interface UserViewProps {
  userId: string;
  profileId: string;
}

const UserView: FC<UserViewProps> = ({ userId, profileId }) => {
  const tab = useSearchParams().get("tab") ?? TABS.ACTIVE_PLANS;
  return (
    <div className="space-y-6">
      {tab === TABS.ACTIVE_PLANS && <DietPlansSection profileId={profileId} />}
    </div>
  );
};

export default UserView;
