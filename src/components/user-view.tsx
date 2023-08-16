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
import WelcomeMessage from "./welcome-message";

interface UserViewProps {
  userId: string;
  profileId: string;
  username: string;
  showWelcomeMessage?: boolean;
}

const UserView: FC<UserViewProps> = ({
  userId,
  profileId,
  showWelcomeMessage,
  username,
}) => {
  const tab = useSearchParams().get("tab");
  return (
    <div className="space-y-6">
      {showWelcomeMessage && !tab && <WelcomeMessage username={username} />}

      {(tab === TABS.ACTIVE_PLANS || !tab) && (
        <DietPlansSection profileId={profileId} href={routes.userDietPlan} />
      )}

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
