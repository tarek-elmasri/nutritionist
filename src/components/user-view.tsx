"use client";

import { TABS } from "@/constants";
import { useSearchParams } from "next/navigation";
import DietPlansSection from "@/components/sections/diet-plans-section";
import { FC } from "react";
import RecordsSection from "./sections/records-section";
import RecordsChartSection from "./sections/records-chart-section";
import ArchivedPlansSection from "./sections/archived-plans-section";

interface UserViewProps {
  userId: string;
  profileId: string;
}

const UserView: FC<UserViewProps> = ({ userId, profileId }) => {
  const tab = useSearchParams().get("tab") ?? TABS.ACTIVE_PLANS;
  return (
    <div className="space-y-6">
      {tab === TABS.ACTIVE_PLANS && <DietPlansSection profileId={profileId} />}
      {tab === TABS.PROGRESS && (
        <>
          <RecordsSection profileId={profileId} />
          <RecordsChartSection profileId={profileId} />
        </>
      )}

      {tab === TABS.HISTORY && <ArchivedPlansSection profileId={profileId} />}
    </div>
  );
};

export default UserView;
