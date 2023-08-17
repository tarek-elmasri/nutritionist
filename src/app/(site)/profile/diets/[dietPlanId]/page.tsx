import getCurrentUser from "@/actions/get CurrentUser";
import { getMeals } from "@/actions/getMeals";
import MealBox from "@/components/meal-box";
import NotificationsMenu from "@/components/notifications-menu";
import Separator from "@/components/ui/separator";
import { redirect } from "next/navigation";
import { FC } from "react";

interface DietPlanPageProps {
  params: {
    dietPlanId: string;
  };
}

const DietPlanPage: FC<DietPlanPageProps> = async ({ params }) => {
  const currentUser = await getCurrentUser(); // protected route
  const meals = await getMeals(currentUser!.id, params.dietPlanId);

  if (meals.length === 0) redirect("/not-found");

  return (
    <div className="space-y-6">
      <div>
        <h4 className="section-header">Diet Plan</h4>
        <Separator />
      </div>
      {meals.map((meal) => (
        <MealBox key={meal.id} data={meal} />
      ))}
    </div>
  );
};

export default DietPlanPage;
