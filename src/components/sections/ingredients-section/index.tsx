"use client";

import { DataTable } from "@/components/ui/data-table";
import useFetch from "@/hooks/useFetch";
import { ServeTypeKey } from "@/type";
import { ItemColumn, columns, filterKeys } from "./columns";
import TableLoader from "@/components/ui/table-loader";
import getFood from "@/actions/getFood";
import { Button } from "@/components/ui/button";
import { serveLabels } from "@/constants/serves";
import CreateItemModal from "@/components/modals/create-item-modal";
import { useState } from "react";
import { FoodSchema } from "@/lib/validations/food-schema";
import createFood from "@/actions/createFood";
import PageLoader from "@/components/ui/page-loader";
import { toast } from "react-hot-toast";

const IngredientsSection = () => {
  const { data: items, isLoading, refetch } = useFetch(getFood);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);

  const structuredItems: ItemColumn[] | undefined = items?.map((item) => ({
    id: item.id,
    label: item.label,
    amount: item.amount,
    unit: item.unit,
    serveType: serveLabels[item.serveType as ServeTypeKey],
  }));

  if (isLoading) {
    return <TableLoader id="ingredients-loader" />;
  }

  const handleNewItem = async (item: FoodSchema) => {
    try {
      setIsSubmitting(true);
      await createFood(item);
      toast.success("Item Added Successfully!");
      await refetch();
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {isSubmitting && (
        <PageLoader message="Please wait while creating new ingredient item." />
      )}

      <CreateItemModal
        isOpen={isAddItemModalOpen}
        onClose={() => setIsAddItemModalOpen(false)}
        onSubmit={handleNewItem}
      />
      <div className="flex items-center justify-between">
        <h4 className="section-header">Ingredients</h4>
        <Button
          size={"sm"}
          type="button"
          onClick={() => setIsAddItemModalOpen(true)}
        >
          Add Item
        </Button>
      </div>

      <div>
        <DataTable
          columns={columns}
          data={structuredItems || []}
          filterKeys={filterKeys}
        />
      </div>
    </div>
  );
};

export default IngredientsSection;
