"use client";

import { getArchivedDietPlans } from "@/actions/getDietPlans";
import { DataTable } from "@/components/ui/data-table";
import TableLoader from "@/components/ui/table-loader";
import useFetch from "@/hooks/useFetch";
import { format } from "date-fns";
import { FC } from "react";
import { columns } from "./columns";

interface ArchivedPlansSectionProps {
  profileId: string;
}

const ArchivedPlansSection: FC<ArchivedPlansSectionProps> = ({ profileId }) => {
  const { data, isLoading } = useFetch(() => getArchivedDietPlans(profileId));

  const formattedPlans = data?.map((plan) => ({
    id: plan.id,
    endDate: format(plan.endDate, "dd-MM-yyy"),
    createdAt: format(plan.createdAt, "dd-MM-yyyy"),
  }));

  return (
    <div className="space-y-6">
      <h4 className="section-header">Archived Diet Plans:</h4>
      {isLoading ? (
        <TableLoader id="archived-plans-loader" />
      ) : (
        <div>
          <DataTable columns={columns} data={formattedPlans || []} />
        </div>
      )}
    </div>
  );
};

export default ArchivedPlansSection;
