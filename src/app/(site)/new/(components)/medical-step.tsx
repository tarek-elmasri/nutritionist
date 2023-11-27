"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import useSteps from "@/hooks/use-steps";
import useCreateProfile from "@/hooks/useCreateProfile";
import profileSchema from "@/lib/validations/profile-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const medicalSchema = profileSchema.pick({
  chronicDisease: true,
  foodAllergy: true,
  previousDiet: true,
});

type MedicalSchema = z.infer<typeof medicalSchema>;

const MedicalStep = () => {
  const { form: data, setForm } = useCreateProfile();
  const { nextStep, prevStep } = useSteps();

  const form = useForm<MedicalSchema>({
    resolver: zodResolver(medicalSchema),
    defaultValues: {
      foodAllergy: "",
      chronicDisease: "",
      previousDiet: false,
    },
  });

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
    <div className="w-full space-y-6">
      <h1 className="text-lg font-semibold text-center">Medical condition?</h1>

      <Form {...form}>
        <form className="space-y-8">
          <FormField
            control={form.control}
            name="previousDiet"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Did you try any diet before?</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={(value) => field.onChange(value === "true")}
                    className="flex gap-6"
                    defaultValue="false"
                  >
                    <FormItem className="flex items-center space-x-2 space-y-0">
                      <FormControl>
                        <RadioGroupItem value={"true"} />
                      </FormControl>
                      <FormLabel className="font-normal">Yes</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-2 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="false" />
                      </FormControl>
                      <FormLabel className="font-normal">No</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="foodAllergy"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Are you allergic to any food? If yes please mention.
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="chronicDisease"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Do you have any chronic disease? If yes please mention.
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
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

export default MedicalStep;
