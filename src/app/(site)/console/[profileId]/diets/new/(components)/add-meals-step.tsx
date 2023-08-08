"use client";

import MealBox from "@/components/meal-box";
import NewMealModal from "@/components/modals/new-meal-modal";
import { Button } from "@/components/ui/button";
import useCreateDietPlan from "@/hooks/use-create-diet-plan";
import { MealForm } from "@/type";
import { Plus } from "lucide-react";
import { useState } from "react";

const AddMealsStep = () => {
  const { meals } = useCreateDietPlan();
  const [mealsForm, setMealsForm] = useState(meals);
  const [isMealModalOpen, setIsMealModalOpen] = useState(false);
  const [currentMealIndex, setCurrentMealIndex] = useState(mealsForm.length);

  const addOrEditMeal = (label: string) => {
    const mealExist = mealsForm.length >= currentMealIndex;

    if (!mealExist) {
      setMealsForm((prev) => [
        ...prev,
        { label, order: mealsForm.length, contents: [] },
      ]);
      return;
    }

    const updatedMeals = mealsForm.map((meal, index) => {
      if (index === currentMealIndex) {
        return { ...meal, label };
      } else {
        return meal;
      }
    });

    setMealsForm(() => updatedMeals);
  };

  const removeMeal = (mealIndex: number) => {
    const mappedForm: Record<string, MealForm> = {};
    let indexCount: number = 0;
    mealsForm.forEach((meal, index) => {
      if (mealIndex !== index) {
        mappedForm[indexCount] = meal;
        mappedForm[indexCount].order = indexCount;
        indexCount++;
      }
    });
    setMealsForm(() => Object.values(mappedForm));
  };

  // mock meal
  const mockMeal: MealForm = {
    label: "lunch",
    order: 1,
    contents: [
      {
        amount: 2,
        itemId: "food1",
        item: {
          amount: 1,
          id: "food1",
          label: "Low Fat Milk",
          serveType: "lowFatMilk",
          unit: "cup",
        },
      },
      {
        amount: 2,
        itemId: "food2",
        item: {
          amount: 1,
          id: "food2",
          label: "Low Fat Milk",
          serveType: "lowFatMilk",
          unit: "cup",
        },
      },
    ],
  };

  return (
    <div className="space-y-6">
      {isMealModalOpen && (
        <NewMealModal
          isOpen={isMealModalOpen}
          onClose={() => setIsMealModalOpen(false)}
          onSubmit={addOrEditMeal}
          initialLabel={mealsForm[currentMealIndex]?.label}
        />
      )}
      <h2 className="section-header">Add Meals</h2>
      {/* meals */}
      <div className="max-w-xl space-y-12">
        {/* meal */}
        {mealsForm.map((meal, mealIndex) => (
          <MealBox
            key={`meal-${meal.order}`}
            data={meal}
            editMode
            onDeleteMeal={() => removeMeal(mealIndex)}
            onLabelEdit={() => {
              setCurrentMealIndex(mealIndex);
              setIsMealModalOpen(true);
            }}
          />
        ))}
      </div>
      {/* add meal button */}
      <Button
        variant={"outline"}
        className="border-lightgreen"
        size={"sm"}
        onClick={() => {
          setCurrentMealIndex(mealsForm.length + 1);
          setIsMealModalOpen(true);
        }}
      >
        <Plus className="w-4 h-4 mr-3" />
        Add Meal
      </Button>
    </div>
  );
};

export default AddMealsStep;
