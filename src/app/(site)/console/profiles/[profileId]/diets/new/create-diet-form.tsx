"use client";

import { Button } from "@/components/ui/button";
import PageLoader from "@/components/ui/page-loader";
import Separator from "@/components/ui/separator";
import useCreateDietPlan from "@/hooks/use-create-diet-plan";
import useSteps from "@/hooks/use-steps";
import ProfileCalculator from "@/lib/profile-calculator";
import type { Food, Profile, Record } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { type FC, type ReactNode, useEffect, useTransition } from "react";
import { toast } from "react-hot-toast";
import AddMealsStep from "./_components/add-meals-step";
import ProfileSummaryStep from "./_components/profile-summary-step";
import ReviewStep from "./_components/review-step";
import ScheduleStep from "./_components/schedule-step";
import ServesStep from "./_components/serves-step";
import type { CreateDietPlanForm } from "@/type";

interface CreateDietFormProps {
  profile: Profile & { records: Record[] };
  foodList: Food[];
}

const CreateDietForm: FC<CreateDietFormProps> = ({ profile, foodList }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const { setProfileCalculator, servePlanForm, schedule, meals, setFoodList } =
    useCreateDietPlan();
  const { setStepsCount, currentStepIndex, prevStep } = useSteps();

  // const [isLoading, setIsLoading] = useState(false);

  const steps: ReactNode[] = [
    <ProfileSummaryStep key={"summary-step"} />,
    <ServesStep key={"serves-step"} />,
    <AddMealsStep key={"meals-step"} />,
    <ScheduleStep key={"schedule-step"} />,
    <ReviewStep key={"review-step"} />,
  ];

  useEffect(() => {
    setStepsCount(steps.length);

    setProfileCalculator(
      new ProfileCalculator({
        name: profile.name,
        activityLevel: profile.activityLevel,
        dob: profile.dob,
        gender: profile.gender,
        height: profile.records[0]!.height,
        weight: profile.records[0]!.weight,
      })
    );

    setFoodList(foodList);
  }, [
    profile.name,
    profile.activityLevel,
    profile.dob,
    profile.gender,
    profile.records,
    setStepsCount,
    setProfileCalculator,
    steps.length,
    foodList,
    setFoodList,
  ]);

  const handleSubmit = async () => {
    startTransition(async () => {
      try {
        const form: CreateDietPlanForm = {
          schedule,
          meals,
          servePlan: servePlanForm,
        };

        await axios.post(`/api/profiles/${profile.id}/diets`, form);
        router.push("/console");
      } catch (error) {
        toast.error("Something went wrong!");
      }
    });
  };

  return (
    <div>
      {isPending && <PageLoader message="Please wait while creating plan" />}
      <h1 className="text-2xl font-bold text-primary">Create Diet Plan</h1>
      <h2 className="font-semibold mt-3">{profile.name}</h2>
      <Separator />
      <div>{steps[currentStepIndex]}</div>

      {steps.length === currentStepIndex + 1 && (
        <div className="py-12 w-full flex justify-end gap-6 items-center">
          <Button
            type="button"
            variant={"outline"}
            className="ring-lightgreen"
            onClick={prevStep}
          >
            Back
          </Button>
          <Button type="button" onClick={handleSubmit}>
            Create
          </Button>
        </div>
      )}
    </div>
  );
};

export default CreateDietForm;
