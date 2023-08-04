"use client";

import { Form, FormField } from "@/components/ui/form";
import useCreateProfile from "@/hooks/useCreateProfile";
import profileSchema, { ProfileSchema } from "@/lib/validations/profile-schema";
import { Goal } from "@/type";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import * as z from "zod";
import logo from "@/assets/logo.png";
import { LucideIcon, AlarmCheck, Dumbbell } from "lucide-react";
import { FC } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface InputRadioProps {
  icon: LucideIcon;
  name: string;
  value: Goal;
  label: string;
  isSelected: boolean;
  onChange: (value: Goal) => void;
}

const InputRadio: FC<InputRadioProps> = ({
  icon: Icon,
  name,
  value,
  label,
  onChange,
  isSelected,
}) => {
  return (
    <>
      <label className="sr-only" htmlFor={`option-${value}`}>
        {label}
      </label>
      <input
        className="sr-only"
        type="radio"
        id={`option-${value}`}
        name={name}
        value={value}
      />
      <div
        onClick={() => onChange(value)}
        className={cn(
          "w-full h-12 bg-lightgreen/30 flex rounded-lg overflow-hidden shadow-sm cursor-pointer ring-primary h",
          isSelected && "ring-2",
          !isSelected && "hover:ring-1"
        )}
        aria-hidden
      >
        <div className={cn("h-full flex items-center justify-center w-12")}>
          <Icon color="#000" size={18} />
        </div>
        <div className={cn("pl-6 flex-1 h-full flex items-center")}>
          <p className="">{label}</p>
        </div>
      </div>
    </>
  );
};

const goalSchema = profileSchema.pick({ goal: true });
type GoalSchema = z.infer<typeof goalSchema>;

const GoalStep = () => {
  const { setForm, nextStep, form: data } = useCreateProfile();

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
            Welcome to HealthyBite
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
            onChange={(value) => form.setValue("goal", value)}
          />

          <InputRadio
            icon={Dumbbell}
            isSelected={goal === Goal.GAIN_WEIGHT}
            label="Gain Weight"
            name="goal"
            value={Goal.GAIN_WEIGHT}
            onChange={(value) => form.setValue("goal", value)}
          />

          <InputRadio
            icon={Dumbbell}
            isSelected={goal === Goal.MAINTAIN_WEIGHT}
            label="Maintaine Weight"
            name="goal"
            value={Goal.MAINTAIN_WEIGHT}
            onChange={(value) => form.setValue("goal", value)}
          />

          <InputRadio
            icon={Dumbbell}
            isSelected={goal === Goal.BUILD_MUSCLES}
            label="Build Muscles"
            name="goal"
            value={Goal.BUILD_MUSCLES}
            onChange={(value) => form.setValue("goal", value)}
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
