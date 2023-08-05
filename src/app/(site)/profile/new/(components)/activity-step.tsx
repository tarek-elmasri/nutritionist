"use client";

import { Form } from "@/components/ui/form";
import useCreateProfile from "@/hooks/useCreateProfile";
import profileSchema, { ProfileSchema } from "@/lib/validations/profile-schema";
import { ActivityLevel, Goal } from "@/type";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import * as z from "zod";
import logo from "@/assets/logo.png";
import {
  AlarmCheck,
  Dumbbell,
  SignalHigh,
  SignalLow,
  SignalMedium,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import InputRadio from "./input-radio";

const activitySchema = profileSchema.pick({ activityLevel: true });
type GoalSchema = z.infer<typeof activitySchema>;

const ActivityStep = () => {
  const { setForm, nextStep, prevStep, form: data } = useCreateProfile();

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
            Welcome to HealthyBite
          </h1>
          <p className="text-lg font-semibold text-center">
            How is your activity level
          </p>
        </div>

        <div className="space-y-6">
          <InputRadio
            icon={SignalLow}
            isSelected={activityLevel === ActivityLevel.LOW}
            label="Low activity"
            name="activityLevel"
            value={ActivityLevel.LOW}
            onChange={(value) => form.setValue("activityLevel", value)}
          />

          <InputRadio
            icon={SignalMedium}
            isSelected={activityLevel === ActivityLevel.MEDIUM}
            label="Moderate Activity"
            name="activityLevel"
            value={ActivityLevel.MEDIUM}
            onChange={(value) => form.setValue("activityLevel", value)}
          />

          <InputRadio
            icon={SignalHigh}
            isSelected={activityLevel === ActivityLevel.HIGH}
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
