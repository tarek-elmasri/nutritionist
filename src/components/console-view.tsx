"use client";

import { TABS } from "@/constants";
import { useSearchParams } from "next/navigation";
import ProfilesTable from "@/components/sections/profiles-section/profiles-table";
import RequireActionsTable from "@/components/sections/require-actions/require-actions-table";
import IngredientsSection from "@/components/sections/ingredients-section";

const ConsoleView = () => {
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
    </div>
  );
};

export default ConsoleView;
