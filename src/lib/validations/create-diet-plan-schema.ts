import * as z from "zod";
import { parseDateWithoutTime } from "../utils";

export const servePlanSchema = z.object({
  starch: z.number().default(0),
  vegetable: z.number().default(0),
  fruit: z.number().default(0),
  leanMeat: z.number().default(0),
  mediumMeat: z.number().default(0),
  highMeat: z.number().default(0),
  lowFatMilk: z.number().default(0),
  mediumFatMilk: z.number().default(0),
  highFatMilk: z.number().default(0),
  legume: z.number().default(0),
  sugar: z.number().default(0),
  pufa: z.number().default(0),
  mufa: z.number().default(0),
});

export const mealItemSchema = z.object({
  amount: z.z.preprocess(
    (value) => parseFloat(value as string),
    z
      .number({ invalid_type_error: "Invalid value" })
      .nonnegative("Invalid value")
      .default(1)
  ),
  itemId: z.string().cuid("Invalid Selection"),
});

export const mealsSchema = z.object({
  label: z.string().nonempty(),
  order: z.number(),
  contents: z.array(mealItemSchema).min(1),
});

export const scheduleSchema = z
  .object({
    startDate: z
      .date()
      .refine(
        (date) =>
          parseDateWithoutTime(date) >= parseDateWithoutTime(new Date()),
        {
          message: "start date must be greater than today",
        }
      ),
    endDate: z.date(),
  })
  .refine(
    (schedule) =>
      parseDateWithoutTime(schedule.endDate).getTime() >
      parseDateWithoutTime(schedule.startDate).getTime(),
    { message: "end date must be greater than start date" }
  );

const dietPlanSchema = z.object({
  // TODO: add servePlan validation
  servePlan: servePlanSchema,
  meals: z.array(mealsSchema).min(1),
  schedule: scheduleSchema,
});

export type DietPlanSchema = z.infer<typeof dietPlanSchema>;
export type ServePlanSchema = z.infer<typeof servePlanSchema>;
export type MealsSchema = z.infer<typeof mealsSchema>;
export type MealItemSchema = z.infer<typeof mealItemSchema>;
export type ScheduleSchema = z.infer<typeof scheduleSchema>;

export default dietPlanSchema;
