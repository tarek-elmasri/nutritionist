"use client";

import { getActiveDietPlans } from "@/actions/getDietPlans";
import { DataTable } from "@/components/ui/data-table";
import TableLoader from "@/components/ui/table-loader";
import useFetch from "@/hooks/useFetch";
import { format } from "date-fns";
import { FC } from "react";
import { columns } from "./columns";
import { getTotalsFromServePlan } from "@/lib/servesHelper";

interface DietPlansSectionProps {
  profileId: string;
  href: string;
}

const DietPlansSection: FC<DietPlansSectionProps> = ({ profileId, href }) => {
  const { data, isLoading } = useFetch(() => getActiveDietPlans(profileId));

  const formattedPlans = data?.map((plan) => ({
    id: plan.id,
    href: `${href}/${plan.id}`,
    totalCalories: getTotalsFromServePlan(plan.servePlan!).calories + " KCAL",
    endDate: format(plan.endDate, "dd-MM-yyy"),
    createdAt: format(plan.createdAt, "dd-MM-yyyy"),
  }));

  return (
    <div className="space-y-6">
      {isLoading ? (
        <TableLoader />
      ) : (
        <>
          <h4 className="section-header">Active Diet Plans:</h4>
          <div>
            <DataTable columns={columns} data={formattedPlans || []} />
          </div>
        </>
      )}
    </div>
  );
};

export default DietPlansSection;
