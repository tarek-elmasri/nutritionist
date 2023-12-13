"use client";

import { DataTable } from "@/components/ui/data-table";
import useFetch from "@/hooks/useFetch";
import { columns } from "./columns";
import TableLoader from "@/components/ui/table-loader";
import { format } from "date-fns";
import getRequireActions from "@/actions/getRequireActions";

const RequireActionsTable = () => {
  const { data: profiles, isLoading } = useFetch(getRequireActions);

  const structuredProfiles = profiles?.map((profile) => ({
    profileId: profile.id,
    name: profile.name,
    nextPlanSchedule: format(
      profile.dietPlans[0]?.endDate ?? profile.createdAt,
      "dd-MM-yyyy"
    ),
  }));

  if (isLoading) {
    return <TableLoader id="require-actions-loader" />;
  }

  return (
    <div className="space-y-3">
      <h4 className="section-header">Require Actions</h4>

      <div>
        <DataTable columns={columns} data={structuredProfiles ?? []} />
      </div>
    </div>
  );
};

export default RequireActionsTable;
