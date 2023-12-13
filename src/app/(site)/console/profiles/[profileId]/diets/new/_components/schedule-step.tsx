"use client";

import type { z } from "zod";
import useCreateDietPlan from "@/hooks/use-create-diet-plan";
import useSteps from "@/hooks/use-steps";
import dietPlanSchema from "@/lib/validations/create-diet-plan-schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn, parseDateWithoutTime } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";

const scheduleSchema = dietPlanSchema.pick({ schedule: true });
type ScheduleSchema = z.infer<typeof scheduleSchema>;

const ScheduleStep = () => {
  const {
    schedule: { startDate, endDate },
    setSchedule,
  } = useCreateDietPlan();
  const { prevStep, nextStep } = useSteps();

  const form = useForm<ScheduleSchema>({
    resolver: zodResolver(scheduleSchema),
    defaultValues: {
      schedule: {
        startDate,
        endDate,
      },
    },
  });

  const scheduleStartDate = form.watch("schedule.startDate");

  const handleNavigation = async (action: "NEXT" | "PREV") => {
    const {
      schedule: { startDate, endDate },
    } = form.getValues();
    setSchedule(startDate, endDate);
    if (action === "NEXT") {
      nextStep();
    } else {
      prevStep();
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="section-header">Set Schedule:</h3>

      <Form {...form}>
        <form className="space-y-8">
          <FormField
            control={form.control}
            name="schedule.startDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Start Date:</FormLabel>
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
                        parseDateWithoutTime(date) <
                        parseDateWithoutTime(new Date())
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="schedule.endDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>End Date:</FormLabel>
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
                      onSelect={(e) => {
                        field.onChange(e);
                        form.clearErrors();
                      }}
                      disabled={(date) =>
                        date < new Date(scheduleStartDate.getTime() + 86400)
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage>
                  {form.formState.errors.schedule?.message}
                </FormMessage>
              </FormItem>
            )}
          />

          <div className="py-12 w-full flex justify-end gap-6 items-center">
            <Button
              type="button"
              variant={"outline"}
              className="ring-lightgreen"
              onClick={() => handleNavigation("PREV")}
            >
              Back
            </Button>
            <Button
              type="button"
              onClick={form.handleSubmit(() => handleNavigation("NEXT"))}
            >
              Next
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ScheduleStep;
