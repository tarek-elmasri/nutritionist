"use client";

import { FC } from "react";
import { format } from "date-fns";
import { getRecords } from "@/actions/getRecords";
import BarsLoader from "@/components/ui/bars-loader";
import Chart from "@/components/ui/chart";
import useFetch from "@/hooks/useFetch";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

interface RecordsChartSectionProps {
  profileId: string;
}
const RecordsChartSection: FC<RecordsChartSectionProps> = ({ profileId }) => {
  const { data, isLoading, refetch } = useFetch(() =>
    getRecords(profileId, "asc")
  );

  const formattedRecords = data?.map((record) => ({
    weight: record.weight.toString(),
    height: record.height.toString(),
    createdAt: format(record.createdAt, "dd-MM"),
  }));

  if (isLoading) return <BarsLoader />;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-6">
        <h4 className="section-header">Weight Progress</h4>
        <Button className="p-0 w-8 h-8">
          <RefreshCw
            className="w-4 h-4"
            type="button"
            onClick={() => refetch()}
          />
        </Button>
      </div>

      <Chart
        id="records-chart"
        data={formattedRecords || []}
        lineKeys={[
          { key: "weight", strokeColor: "red" },
          // { key: "height", strokeColor: "green" },
        ]}
        xAxisKey={"createdAt"}
      />
    </div>
  );
};

export default RecordsChartSection;
