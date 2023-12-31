"use client";

import useCreateProfile, { CreateProfileForm } from "@/hooks/useCreateProfile";
import { FC, ReactNode, useEffect, useState, useTransition } from "react";
import GoalStep from "./goal-step";
import DetailsStep from "./details-step";
import ObjectiveStep from "./objective-step";
import PageLoader from "@/components/ui/page-loader";
import { toast } from "react-hot-toast";
import { Profile } from "@prisma/client";
import { useRouter } from "next/navigation";
import ActivityStep from "./activity-step";
import useSteps from "@/hooks/use-steps";
import MedicalStep from "./medical-step";

export interface NewProfileFormProps {
  userId: string;
  onSubmit: (form: CreateProfileForm) => Promise<Profile>;
}

const NewProfileForm: FC<NewProfileFormProps> = ({
  userId,
  onSubmit: createProfile,
}) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const { setForm } = useCreateProfile();
  const { currentStepIndex, setStepsCount } = useSteps();

  const handleCreateProfile = async (form: CreateProfileForm) => {
    startTransition(async () => {
      try {
        await createProfile(form);
        router.replace("/profile");
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
      }
    });
  };

  const steps: ReactNode[] = [
    <GoalStep key={"goal-step"} />,
    <ActivityStep key={"activity-step"} />,
    <DetailsStep key={"detail-step"} />,
    <MedicalStep key={"medical-step"} />,
    <ObjectiveStep key={"objective-step"} onSubmit={handleCreateProfile} />,
    // <PlansStep subscriptionPlans={subscriptionPlans} key={"plan-step"} />,
  ];

  useEffect(() => {
    setStepsCount(steps.length);
    setForm({ userId });
  }, [steps.length, userId, setStepsCount, setForm]);

  return (
    <div className="w-full max-w-sm">
      {isPending && (
        <PageLoader message="Please wait while creating your profile" />
      )}
      {steps[currentStepIndex]}
    </div>
  );
};

export default NewProfileForm;
