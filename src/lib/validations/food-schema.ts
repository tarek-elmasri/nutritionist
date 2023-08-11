import { serveLabels } from "@/constants/serves";
import * as z from "zod";
import { isPositiveFloat } from "../utils";

const foodSchema = z.object({
  label: z.string().nonempty("Required"),
  amount: z
    .string()
    .nonempty("Required")
    .refine((value) => isPositiveFloat(value), "Invalid number")
    .transform((value) => parseFloat(value)),
  unit: z.string().nonempty("Required"),
  serveType: z
    .string()
    .refine(
      (value) => Object.keys(serveLabels).includes(value),
      "Invalid serve type"
    ),
});

export type FoodSchema = z.infer<typeof foodSchema>;

export default foodSchema;
