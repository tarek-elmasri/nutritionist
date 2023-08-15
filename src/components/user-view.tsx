"use client";

import { TABS } from "@/constants";
import { useSearchParams } from "next/navigation";
import DietPlansSection from "@/components/sections/diet-plans-section";
import { FC } from "react";
import RecordsSection from "@/components/sections/records-section";
import RecordsChartSection from "@/components/sections/records-chart-section";
import ArchivedPlansSection from "@/components/sections/archived-plans-section";
import MessagesSection from "@/components/sections/messages-section";
import routes from "@/constants/routes";

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

      {tab === TABS.MESSAGES && (
        <MessagesSection userId={userId} messagesLink={routes.userMessage} />
      )}
    </div>
  );
};

export default UserView;
