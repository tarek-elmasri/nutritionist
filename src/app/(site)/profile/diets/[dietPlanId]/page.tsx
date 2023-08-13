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
    <div className="relative w-full h-full bg-background p-6 rounded-lg shadow-[-5px_5px_10px_0_hsl(var(--primary)_/0.5)] ">
      <div className="absolute top-3 right-3">
        <NotificationsMenu />
      </div>

      <div className="mt-10 p-6 h-full overflow-y-auto">
        <div className="space-y-6">
          <div>
            <h4 className="section-header">Diet Plan</h4>
            <Separator />
          </div>
          {meals.map((meal) => (
            <MealBox key={meal.id} data={meal} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DietPlanPage;
