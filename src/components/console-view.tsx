"use client";

import { TABS } from "@/constants";
import { useSearchParams } from "next/navigation";
import ProfilesTable from "@/components/sections/profiles-section/profiles-table";
import RequireActionsTable from "@/components/sections/require-actions/require-actions-table";
import IngredientsSection from "@/components/sections/ingredients-section";
import MessagesSection from "@/components/sections/messages-section";
import routes from "@/constants/routes";

const ConsoleView = ({ userId }: { userId: string }) => {
  const tab = useSearchParams().get("tab") ?? TABS.PROFILES;

  return (
    <div className="space-y-6">
      {tab === TABS.PROFILES && (
        <>
          <ProfilesTable />
          <RequireActionsTable />
        </>
      )}

      {tab === TABS.INGREDIENTS && <IngredientsSection />}

      {tab === TABS.MESSAGES && (
        <MessagesSection userId={userId} messagesLink={routes.consoleMessage} />
      )}
    </div>
  );
};

export default ConsoleView;
