import * as z from "zod";
import { isPositiveFloat } from "../utils";

const recordsSchema = z.object({
  weight: z.union([
    z
      .string()
      .nonempty()
      .min(2)
      .refine((value) => isPositiveFloat(value), "Invalid Value")
      .transform((v) => parseFloat(v)),
    z.number().min(2).positive(),
  ]),
  height: z.union([
    z
      .string()
      .nonempty()
      .min(2)
      .refine((value) => isPositiveFloat(value), "Invalid Value")
      .transform((v) => parseFloat(v)),
    z.number().min(2).positive(),
  ]),
  profileId: z.string().cuid(),
});

export type RecordsSchema = z.infer<typeof recordsSchema>;

export default recordsSchema;
