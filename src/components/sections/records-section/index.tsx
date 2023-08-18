"use client";

import { getRecords } from "@/actions/getRecords";
import { DataTable } from "@/components/ui/data-table";
import useFetch from "@/hooks/useFetch";
import { format } from "date-fns";
import { FC, useState } from "react";
import { columns, filterKeys } from "./columns";
import TableLoader from "@/components/ui/table-loader";
import { Button } from "@/components/ui/button";
import AddRecordModal from "@/components/modals/add-record-modal";
import PageLoader from "@/components/ui/page-loader";
import createRecord from "@/actions/createRecord";
import { RecordsSchema } from "@/lib/validations/records-schema";
import { toast } from "react-hot-toast";
import { parseDateWithoutTime } from "@/lib/utils";

interface RecordsSectionProps {
  profileId: string;
  viewMode?: boolean;
}

const RecordsSection: FC<RecordsSectionProps> = ({ profileId, viewMode }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAddRecordModalOpen, setIsAddRecordModalOpen] = useState(false);

  const {
    data: records,
    isLoading,
    refetch,
  } = useFetch(() => getRecords(profileId));

  const formattedRecords = records?.map((record) => ({
    id: record.id,
    weight: record.weight.toString(),
    height: record.height.toString(),
    bust: record.bust?.toString() ?? "-",
    waist: record.waist?.toString() ?? "-",
    abdominalGirth: record.abdominalGirth?.toString() ?? "-",
    hips: record.hips?.toString() ?? "-",
    arm: record.arm?.toString() ?? "-",
    thighs: record.thighs?.toString() ?? "-",
    createdAt: format(record.createdAt, "dd-MM-yyy"),
  }));

  const handleCreateRecord = async (form: RecordsSchema) => {
    try {
      setIsSubmitting(true);
      await createRecord(form);
      toast.success("Record added successfully!");
      refetch();
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isAllowedToCreateNewRecord =
    records?.[0] && parseDateWithoutTime(new Date()) > records[0].createdAt;

  return (
    <div className="space-y-6">
      {isSubmitting && (
        <PageLoader message="Please wait while adding your new record" />
      )}
      {isAddRecordModalOpen && (
        <AddRecordModal
          isOpen={isAddRecordModalOpen}
          onClose={() => setIsAddRecordModalOpen(false)}
          profileId={profileId}
          initialData={records?.[0]}
          onSubmit={handleCreateRecord}
        />
      )}
      <div className="flex items-center justify-between">
        <div>
          <h4 className="section-header">Records</h4>
          {!viewMode && (
            <>
              <p className="text-xs text-darkred leading-6">
                * It&apos;s recommanded to add new records on weekly basis.
              </p>
              <p className="text-xs text-darkred leading-6">
                * Only single record is allowed on daily basis.
              </p>
            </>
          )}
        </div>
        {!viewMode && (
          <Button
            size={"sm"}
            type="button"
            disabled={!isAllowedToCreateNewRecord}
            onClick={() => setIsAddRecordModalOpen(true)}
          >
            New
          </Button>
        )}
      </div>
      {isLoading ? (
        <TableLoader id="records-loader" />
      ) : (
        <DataTable
          columns={columns}
          data={formattedRecords || []}
          filterKeys={filterKeys}
        />
      )}
    </div>
  );
};

export default RecordsSection;
