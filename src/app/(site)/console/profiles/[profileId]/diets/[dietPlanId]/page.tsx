import { getDietPlanById } from "@/actions/getDietPlans";
import MealBox from "@/components/meal-box";
import ServeMapBox from "@/components/serve-map-box";
import Separator from "@/components/ui/separator";
import {
  calculateMealsServeCount,
  getTotalsFromServePlan,
} from "@/lib/servesHelper";
import { format } from "date-fns";
import { redirect } from "next/navigation";
import type { FC } from "react";

interface ConsoleDietPlanPageProps {
  params: {
    profileId: string;
    dietPlanId: string;
  };
}
const ConsoleDietPlanPage: FC<ConsoleDietPlanPageProps> = async ({
  params,
}) => {
  const dietPlan = await getDietPlanById(params.dietPlanId);

  if (!dietPlan) redirect("/not-found");

  const mealsServes = calculateMealsServeCount(dietPlan.meals);
  const caloriesInMeals = getTotalsFromServePlan(mealsServes).calories;
  const caloriesInServePlan = getTotalsFromServePlan(
    dietPlan.servePlan!
  ).calories;

  return (
    <div className="space-y-6">
      <div>
        <h4 className="section-header">Diet Plan:</h4>
        <p className="text-xs text-muted-foreground">
          from: {format(dietPlan.startDate, "dd-MM-yyy")}
        </p>
        <p className="text-xs text-muted-foreground">
          until: {format(dietPlan.endDate, "dd-MM-yyyy")}
        </p>
      </div>

      <Separator />

      <div>
        <h4 className="section-header">Total Calories:</h4>
        <p>
          {caloriesInMeals} / {caloriesInServePlan}
        </p>
      </div>
      <div className="grid grid-cols-[1fr_auto]">
        <div className="space-y-6">
          {dietPlan.meals.map((meal) => (
            <MealBox key={meal.id} data={meal} editMode={false} />
          ))}
        </div>
        <ServeMapBox
          servesCount={mealsServes}
          servesTotal={dietPlan.servePlan!}
        />
      </div>
    </div>
  );
};

export default ConsoleDietPlanPage;
