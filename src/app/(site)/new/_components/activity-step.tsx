"use client";

import logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import useSteps from "@/hooks/use-steps";
import useCreateProfile from "@/hooks/useCreateProfile";
import profileSchema from "@/lib/validations/profile-schema";
import { ActivityLevel } from "@/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignalHigh, SignalLow, SignalMedium } from "lucide-react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import InputRadio from "./input-radio";

const activitySchema = profileSchema.pick({ activityLevel: true });
type GoalSchema = z.infer<typeof activitySchema>;

const ActivityStep = () => {
  const { setForm, form: data } = useCreateProfile();
  const { nextStep, prevStep } = useSteps();

  const form = useForm<GoalSchema>({
    resolver: zodResolver(activitySchema),
    defaultValues: { activityLevel: data.activityLevel as ActivityLevel },
  });

  const activityLevel = form.watch("activityLevel");

  const handleNavigation = async (action: "NEXT" | "PREV") => {
    setForm({
      ...form.getValues(),
    });
    if (action === "NEXT") {
      nextStep();
    } else {
      prevStep();
    }
  };

  return (
    <Form {...form}>
      <form className="w-full">
        <div className="flex flex-col justify-center gap-6">
          <Image src={logo} alt="" className="w-36 h-auto mx-auto" />
          <h1 className="text-2xl text-primary font-semibold text-center">
            Welcome to NourishMe
          </h1>
          <p className="text-lg font-semibold text-center">
            How is your activity level
          </p>
        </div>

        <div className="space-y-6">
          <InputRadio
            icon={SignalLow}
            isSelected={activityLevel === (ActivityLevel.LOW as string)}
            label="Low activity"
            name="activityLevel"
            value={ActivityLevel.LOW}
            onChange={(value) => form.setValue("activityLevel", value)}
          />

          <InputRadio
            icon={SignalMedium}
            isSelected={activityLevel === (ActivityLevel.MEDIUM as string)}
            label="Moderate Activity"
            name="activityLevel"
            value={ActivityLevel.MEDIUM}
            onChange={(value) => form.setValue("activityLevel", value)}
          />

          <InputRadio
            icon={SignalHigh}
            isSelected={activityLevel === (ActivityLevel.HIGH as string)}
            label="High Level"
            name="activityLevel"
            value={ActivityLevel.HIGH}
            onChange={(value) => form.setValue("activityLevel", value)}
          />

          <div className=" flex flex-row-reverse items-center gap-3 w-full">
            <Button
              type="button"
              className="w-full text-lg"
              onClick={form.handleSubmit(() => handleNavigation("NEXT"))}
            >
              Next
            </Button>

            <Button
              type="button"
              variant={"outline"}
              className="w-full text-lg"
              onClick={() => handleNavigation("PREV")}
            >
              Back
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default ActivityStep;
