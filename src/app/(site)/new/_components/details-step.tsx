"use client";

import type { z } from "zod";
import profileSchema from "@/lib/validations/profile-schema";
import useCreateProfile from "@/hooks/useCreateProfile";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Gender } from "@/type";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import useSteps from "@/hooks/use-steps";

const detailsSchema = profileSchema.pick({
  name: true,
  dob: true,
  gender: true,
  weight: true,
  height: true,
});
type DetailsSchema = z.infer<typeof detailsSchema>;

const DetailsStep = () => {
  const { form: data, setForm } = useCreateProfile();
  const { prevStep, nextStep } = useSteps();

  const form = useForm<DetailsSchema>({
    resolver: zodResolver(detailsSchema),
    defaultValues: data,
  });

  const handleNavigation = async (action: "NEXT" | "PREV") => {
    setForm({
      ...form.getValues(),
    });
    console.log("navigation");
    if (action === "NEXT") {
      nextStep();
    } else {
      prevStep();
    }
  };

  return (
    <div className="w-full space-y-6">
      <h1 className="text-lg font-semibold text-center">
        Fill up your details
      </h1>

      <Form {...form}>
        <form className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dob"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date of birth</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                      defaultMonth={new Date(new Date().setFullYear(1985))}
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription className="text-xs">
                  Your date of birth is used to calculate your age.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Gender</FormLabel>
                <FormControl className="flex items-center gap-6">
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className=""
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value={Gender.MALE} />
                      </FormControl>
                      <FormLabel>Male</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value={Gender.FEMALE} />
                      </FormControl>
                      <FormLabel className="font-normal">Female</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="weight"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Weight</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="height"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Height</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
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

export default DetailsStep;
