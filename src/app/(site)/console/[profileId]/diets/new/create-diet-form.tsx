"use client";

import useCreateDietPlan from "@/hooks/use-create-diet-plan";
import useSteps from "@/hooks/use-steps";
import ProfileCalculator from "@/lib/profile-calculator";
import { Profile, Record } from "@prisma/client";
import { FC, ReactNode, useEffect } from "react";
import ProfileSummaryStep from "./(components)/profile-summary-step";
import Separator from "@/components/ui/separator";
import ServesStep from "./(components)/serves-step";
import AddMealsStep from "./(components)/add-meals-step";

interface CreateDietFormProps {
  profile: Profile & { records: Record[] };
}

const CreateDietForm: FC<CreateDietFormProps> = ({ profile }) => {
  const { setProfileCalculator } = useCreateDietPlan();
  const { setStepsCount, currentStepIndex } = useSteps();

  const steps: ReactNode[] = [
    <ProfileSummaryStep key={"summary-step"} />,
    <ServesStep key={"serves-step"} />,
    <AddMealsStep key={"meals-step"} />,
  ];

  useEffect(() => {
    setStepsCount(steps.length);

    setProfileCalculator(
      new ProfileCalculator({
        name: profile.name,
        activityLevel: profile.activityLevel,
        dob: profile.dob,
        gender: profile.gender,
        height: profile.records[0].height,
        weight: profile.records[0].weight,
      })
    );
  }, [
    profile.name,
    profile.activityLevel,
    profile.dob,
    profile.gender,
    profile.records,
    setStepsCount,
    setProfileCalculator,
    steps.length,
  ]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-primary">Create Diet Plan</h1>
      <h2 className="font-semibold mt-3">{profile.name}</h2>
      <Separator />
      <div>{steps[currentStepIndex]}</div>
    </div>
  );
};

export default CreateDietForm;
