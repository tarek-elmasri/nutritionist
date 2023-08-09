"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { calculateMealsServeCount } from "@/lib/servesHelper";
import useCreateDietPlan from "@/hooks/use-create-diet-plan";
import MealBox from "@/components/meal-box";
import NewMealModal from "@/components/modals/new-meal-modal";
import ServeMapBox from "@/components/serve-map-box";
import { Button } from "@/components/ui/button";
import { MealForm, MealItemForm } from "@/type";
import AddMealItemModal from "@/components/modals/add-meal-item-modal";
import foods from "@/type/mockFoods";
import useSteps from "@/hooks/use-steps";

const AddMealsStep = () => {
  const { meals, servePlanForm, setMeals } = useCreateDietPlan();
  const { nextStep, prevStep } = useSteps();
  // const [mealsForm, setMealsForm] = useState(meals);
  const [isMealModalOpen, setIsMealModalOpen] = useState(false);
  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);
  const [currentMealIndex, setCurrentMealIndex] = useState(meals.length);
  const [serveTotals, setServeTotals] = useState(
    calculateMealsServeCount(meals)
  );

  // TODO: add deletion and addition functions to the hook
  const addOrEditMeal = (label: string) => {
    const mealExist = meals.length >= currentMealIndex;
    if (!mealExist) {
      setMeals([...meals, { label, order: meals.length, contents: [] }]);
      return;
    }

    const updatedMeals = meals.map((meal, index) => {
      if (index === currentMealIndex) {
        return { ...meal, label };
      } else {
        return meal;
      }
    });

    setMeals(updatedMeals);
  };

  const removeMeal = (mealIndex: number) => {
    const mappedForm: Record<string, MealForm> = {};
    let indexCount: number = 0;
    meals.forEach((meal, index) => {
      if (mealIndex !== index) {
        mappedForm[indexCount] = meal;
        mappedForm[indexCount].order = indexCount;
        indexCount++;
      }
    });
    setMeals(Object.values(mappedForm));
  };

  const addItemtoMeal = (mealItem: MealItemForm) => {
    const newMeals = [...meals];
    newMeals[currentMealIndex].contents.push(mealItem);
    setMeals(newMeals);
    setServeTotals(calculateMealsServeCount(newMeals));
    setIsAddItemModalOpen(false);
  };

  const removeItemFromMeal = (mealIndex: number, itemIndex: number) => {
    const newMeals = [...meals];
    newMeals[mealIndex].contents.splice(itemIndex, 1);
    setServeTotals(calculateMealsServeCount(newMeals));
    setMeals(newMeals);
  };

  return (
    <div className="space-y-6 py-12">
      {isAddItemModalOpen && (
        <AddMealItemModal
          isOpen={isAddItemModalOpen}
          onClose={() => setIsAddItemModalOpen(false)}
          items={foods}
          onSubmit={addItemtoMeal}
        />
      )}
      {isMealModalOpen && (
        <NewMealModal
          isOpen={isMealModalOpen}
          onClose={() => setIsMealModalOpen(false)}
          onSubmit={addOrEditMeal}
          initialLabel={meals[currentMealIndex]?.label}
        />
      )}
      <h2 className="section-header">Add Meals</h2>
      {/* meals */}
      <div className="relative flex justify-between items-start gap-6">
        <div className="w-full max-w-2xl space-y-12">
          {/* meal */}
          {meals.map((meal, mealIndex) => (
            <MealBox
              key={`meal-${meal.order}`}
              data={meal}
              editMode={true}
              onDeleteMeal={() => removeMeal(mealIndex)}
              onLabelEdit={() => {
                setCurrentMealIndex(mealIndex);
                setIsMealModalOpen(true);
              }}
              onAddItem={() => {
                setCurrentMealIndex(mealIndex);
                setIsAddItemModalOpen(true);
              }}
              onRemoveItem={(itemIndex) =>
                removeItemFromMeal(mealIndex, itemIndex)
              }
            />
          ))}
          {/* add meal button */}
          <Button
            variant={"outline"}
            className="border-lightgreen"
            size={"sm"}
            onClick={() => {
              setCurrentMealIndex(meals.length + 1);
              setIsMealModalOpen(true);
            }}
          >
            <Plus className="w-4 h-4 mr-3" />
            Add Meal
          </Button>
        </div>

        {/* serves map */}
        <ServeMapBox servesCount={serveTotals} servesTotal={servePlanForm} />
      </div>

      <div className="py-12 w-full flex justify-end gap-6 items-center">
        <Button
          variant={"outline"}
          className="ring-lightgreen"
          onClick={() => prevStep()}
        >
          Back
        </Button>
        <Button onClick={() => nextStep()}>Next</Button>
      </div>
    </div>
  );
};

export default AddMealsStep;
