"use client";

import { TABS } from "@/constants";
import { useSearchParams } from "next/navigation";
import ProfilesTable from "./sections/profiles-section/profiles-table";
import RequireActionsTable from "./sections/require-actions/require-actions-table";

const ConsoleView = () => {
  const tab = useSearchParams().get("tab") ?? TABS.PROFILES;

  return (
    <div>
      {tab === TABS.PROFILES && (
        <div className="space-y-6">
          <ProfilesTable />
          <RequireActionsTable />
        </div>
      )}
    </div>
  );
};

export default ConsoleView;
