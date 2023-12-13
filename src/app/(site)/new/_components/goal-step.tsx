"use client";

import { Form } from "@/components/ui/form";
import useCreateProfile from "@/hooks/useCreateProfile";
import profileSchema from "@/lib/validations/profile-schema";
import { Goal } from "@/type";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import logo from "@/assets/logo.png";
import { AlarmCheck, Dumbbell } from "lucide-react";
import { Button } from "@/components/ui/button";
import InputRadio from "./input-radio";
import useSteps from "@/hooks/use-steps";

const goalSchema = profileSchema.pick({ goal: true });
type GoalSchema = z.infer<typeof goalSchema>;

const GoalStep = () => {
  const { setForm, form: data } = useCreateProfile();
  const { nextStep } = useSteps();

  const form = useForm<GoalSchema>({
    resolver: zodResolver(goalSchema),
    defaultValues: { goal: data.goal as Goal },
  });

  const goal = form.watch("goal");

  const handleNext = () => {
    setForm({ ...data });
    nextStep();
  };

  return (
    <Form {...form}>
      <form className="w-full" onSubmit={form.handleSubmit(handleNext)}>
        <div className="flex flex-col justify-center gap-6">
          <Image src={logo} alt="" className="w-36 h-auto mx-auto" />
          <h1 className="text-2xl text-primary font-semibold text-center">
            Welcome to NourishMe
          </h1>
          <p className="text-lg font-semibold text-center">Choose your goal</p>
        </div>

        <div className="space-y-6">
          <InputRadio
            icon={AlarmCheck}
            isSelected={goal === Goal.LOSE_WEIGHT}
            label="Lose Weight"
            name="goal"
            value={Goal.LOSE_WEIGHT}
            onChange={(value) => form.setValue("goal", value as Goal)}
          />

          <InputRadio
            icon={Dumbbell}
            isSelected={goal === Goal.GAIN_WEIGHT}
            label="Gain Weight"
            name="goal"
            value={Goal.GAIN_WEIGHT}
            onChange={(value) => form.setValue("goal", value as Goal)}
          />

          <InputRadio
            icon={Dumbbell}
            isSelected={goal === Goal.MAINTAIN_WEIGHT}
            label="Maintaine Weight"
            name="goal"
            value={Goal.MAINTAIN_WEIGHT}
            onChange={(value) => form.setValue("goal", value as Goal)}
          />

          <InputRadio
            icon={Dumbbell}
            isSelected={goal === Goal.BUILD_MUSCLES}
            label="Build Muscles"
            name="goal"
            value={Goal.BUILD_MUSCLES}
            onChange={(value) => form.setValue("goal", value as Goal)}
          />

          <Button type="submit" className="w-full text-lg h-12">
            Next
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default GoalStep;
