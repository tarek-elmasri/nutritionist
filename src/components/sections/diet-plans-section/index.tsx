"use client";

import { getActiveDietPlans } from "@/actions/getDietPlans";
import { DataTable } from "@/components/ui/data-table";
import TableLoader from "@/components/ui/table-loader";
import useFetch from "@/hooks/useFetch";
import { format } from "date-fns";
import { FC } from "react";
import { columns } from "./columns";
import Image from "next/image";
import logo from "@/assets/logo.png";
import WelcomeMessage from "@/components/welcome-message";

// const WelcomeMessage = () => (
//   <div className="relative w-full">
//     <div className="absolute inset-0">
//       <Image src={logo} alt="" className="mx-auto opacity-10" />
//     </div>
//     <div className="space-y-6">
//       <h4 className="section-header text-primary">Welcome to our platform.</h4>
//       <div>
//         <p>Our experts recieved your profile and working on your diet plans</p>
//         <p>You will recieve a notification once your first plan is ready.</p>
//       </div>
//       <p className="font-semibold text-primary"> Stay Tuned !!</p>
//     </div>
//   </div>
// );

interface DietPlansSectionProps {
  profileId: string;
}

const DietPlansSection: FC<DietPlansSectionProps> = ({ profileId }) => {
  const { data, isLoading } = useFetch(() => getActiveDietPlans(profileId));

  const formattedPlans = data?.map((plan) => ({
    id: plan.id,
    endDate: format(plan.endDate, "dd-MM-yyy"),
    createdAt: format(plan.createdAt, "dd-MM-yyyy"),
  }));

  return (
    <div className="space-y-6">
      {isLoading ? (
        <TableLoader />
      ) : data?.length === 0 ? (
        <WelcomeMessage />
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
