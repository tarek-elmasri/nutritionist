"use client";

import type { z } from "zod";
import profileSchema from "@/lib/validations/profile-schema";
import useCreateProfile, {
  type CreateProfileForm,
} from "@/hooks/useCreateProfile";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import type { FC } from "react";
import useSteps from "@/hooks/use-steps";

const objectiveSchema = profileSchema.pick({
  objective: true,
});
type ObjectiveSchema = z.infer<typeof objectiveSchema>;

interface ObjectiveStepProps {
  onSubmit: (form: CreateProfileForm) => void;
}
const ObjectiveStep: FC<ObjectiveStepProps> = ({ onSubmit }) => {
  const { form: data, setForm } = useCreateProfile();
  const { prevStep } = useSteps();

  const form = useForm<ObjectiveSchema>({
    resolver: zodResolver(objectiveSchema),
    defaultValues: data,
  });

  const handleNavigation = async (action: "NEXT" | "PREV") => {
    setForm({
      ...form.getValues(),
    });
    if (action === "NEXT") {
      onSubmit(form.getValues());
    } else {
      prevStep();
    }
  };

  return (
    <div className="w-full space-y-6">
      <h1 className="text-lg font-semibold text-center">
        Tell us about yourself
      </h1>

      <Form {...form}>
        <form className="space-y-6">
          <FormField
            control={form.control}
            name="objective"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-neutral-600 text-sm font-semibold">
                  Start with your daily diet habbits, sports activity, sleeping
                  patterns and end with your target objectives.
                </FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    rows={20}
                    className="resize-none"
                    autoFocus
                  />
                </FormControl>
                <FormDescription className="text-xs">
                  * Minimum of 10 characters
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
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
        </form>
      </Form>
    </div>
  );
};

export default ObjectiveStep;
