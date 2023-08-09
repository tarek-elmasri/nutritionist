import { ActivityLevel, Gender, Goal } from "@/type";
import * as z from "zod";

const profileSchema = z.object({
  goal: z.nativeEnum(Goal),
  name: z.string().nonempty("Required"),
  dob: z.date().max(new Date(), "Invalid Date"),
  gender: z
    .string()
    .refine((value) => Object.values(Gender).includes(value as Gender)),
  activityLevel: z
    .string()
    .refine((value) =>
      Object.values(ActivityLevel).includes(value as ActivityLevel)
    ),
  weight: z.preprocess(
    (value) => parseFloat(value as string),
    z
      .number({ invalid_type_error: "Invalid value" })
      .nonnegative("Invalid value")
      .min(10, "Invalid value")
  ),
  height: z.preprocess(
    (value) => parseFloat(value as string),
    z
      .number({ invalid_type_error: "Invalid value" })
      .nonnegative("Invalid value")
      .min(10, "Invalid value")
  ),
  objective: z
    .string()
    .nonempty("Required")
    .min(10, "should have 10 characters at least"),
  foodAllergy: z
    .string()
    .optional()
    .transform((v) => (v === "" ? undefined : v)),
  chronicDisease: z
    .string()
    .optional()
    .transform((v) => (v === "" ? undefined : v)),
  previousDiet: z.boolean().default(false),
  userId: z.string().cuid(),
  // subscriptionPlanId: z.string().cuid(),
});

export type ProfileSchema = z.infer<typeof profileSchema>;

export default profileSchema;
