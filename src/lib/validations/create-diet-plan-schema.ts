import * as z from "zod";

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
  content: z.array(mealItemSchema).min(1),
});

const dietPlanSchema = z.object({
  // TODO: add servePlan validation
  //servePlan: z.string().optional(),
  meals: z.array(mealsSchema).min(1),
});

export type DietPlanSchema = z.infer<typeof dietPlanSchema>;
export type MealsSchema = z.infer<typeof mealsSchema>;
export type MealItemSchema = z.infer<typeof mealItemSchema>;

export default dietPlanSchema;
