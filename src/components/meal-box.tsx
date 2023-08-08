"use client";

import { MealForm, MealItemForm } from "@/type";
import { Pen, Plus, X } from "lucide-react";
import { FC } from "react";
import { Button } from "./ui/button";

interface MealItemProps {
  data: MealItemForm;
  editMode?: boolean;
  onRemoveItem?: () => void;
  onAddItem?: () => void;
}
const MealItem: FC<MealItemProps> = ({
  data,
  editMode,
  onRemoveItem,
  onAddItem,
}) => {
  const { amount, item } = data;
  const { amount: unitAmount, label, unit } = item;

  const itemLabel = `${(amount * unitAmount).toFixed(1)} ${unit} ${label}`;

  return (
    <div className="py-2 px-4 text-sm rounded-lg shadow-sm shadow-primary flex items-center justify-center gap-2 bg-primary text-primary-foreground">
      <div>
        <p>{itemLabel}</p>
      </div>
      {editMode && (
        <div className="p-1 rounded-full hover:bg-neutral-100/50 hover:text-neutral-900  cursor-pointer">
          <X className="w-3 h-3  " />
        </div>
      )}
    </div>
  );
};

type MealBoxProps = {
  data: MealForm;
  editMode?: boolean;
  onLabelEdit?: () => void;
  onDeleteMeal?: () => void;
  onRemoveItem?: (itemIndex: number) => void;
  onAddItem?: () => void;
};

const MealBox: FC<MealBoxProps> = ({
  data,
  editMode,
  onLabelEdit,
  onDeleteMeal,
  onRemoveItem,
  onAddItem,
}) => {
  const { label: mealLabel, order, contents } = data;

  return (
    <div className="space-y-3">
      {/* meal Label */}
      <div className="flex items-center gap-6">
        <p>{mealLabel}</p>
        {editMode && (
          <>
            <div className="flex items-center gap-3">
              <div
                className="p-2 rounded-full bg-lightgreen/50 hover:bg-lightgreen cursor-pointer"
                onClick={onLabelEdit}
              >
                <Pen className="w-3 h-3" />
              </div>
              <div
                className="p-2 rounded-full bg-red-300 hover:bg-red-400 cursor-pointer  hover:text-white"
                onClick={onDeleteMeal}
              >
                <X className="w-[0.65rem] h-[0.65rem]" />
              </div>
            </div>
          </>
        )}
      </div>

      {/* meal box wrapper */}
      <div className="flex items-center gap-3 ">
        {/* meal box container */}
        <div className="p-6 ring-2 ring-primary rounded-2xl  space-y-6">
          {/* meal box */}
          <div className="flex flex-wrap gap-6">
            {/* meal items */}
            {contents.length === 0 && (
              <p className="w-full text-sm text-center">No items yet!</p>
            )}
            {contents.map((mealItem, i) => (
              <MealItem
                key={`meal-${order}-item-${i}`}
                data={mealItem}
                editMode={editMode}
                onAddItem={onAddItem}
                onRemoveItem={() => onRemoveItem && onRemoveItem(i)}
              />
            ))}
          </div>

          {/* add item button */}
          {editMode && (
            <Button
              size={"sm"}
              variant={"outline"}
              className="border-lightgreen"
              onClick={onAddItem}
            >
              <Plus className="w-4 h-4 mr-3 " />
              Add Item
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MealBox;
