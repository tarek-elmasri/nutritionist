"use client";

import { getProfiles } from "@/actions/getProfiles";
import { DataTable } from "@/components/ui/data-table";
import useFetch from "@/hooks/useFetch";
import { calculateAgeFromDOB } from "@/lib/utils";
import { Gender } from "@/type";
import { columns, filterKeys } from "./columns";
import TableLoader from "@/components/ui/table-loader";
import { format } from "date-fns";

const ProfilesTable = () => {
  const { data: profiles, isLoading } = useFetch(getProfiles);

  const structuredProfiles = profiles?.map((profile) => ({
    id: profile.id,
    userId: profile.userId,
    name: profile.name,
    age: calculateAgeFromDOB(profile.dob),
    gender: profile.gender as Gender,
    createdAt: format(profile.createdAt, "dd-MM-yyyy"),
  }));

  if (isLoading) {
    return <TableLoader id="profiles-loader" />;
  }

  return (
    <div className="space-y-3">
      <h4 className="section-header">Profiles</h4>

      <div>
        <DataTable
          columns={columns}
          data={structuredProfiles || []}
          filterKeys={filterKeys}
        />
      </div>
    </div>
  );
};

export default ProfilesTable;
