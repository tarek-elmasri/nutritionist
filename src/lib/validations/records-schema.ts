import * as z from "zod";
import { isPositiveFloat } from "../utils";

const recordValueSchema = z.union([
  z
    .string()
    .nonempty()
    .min(2)
    .refine((value) => isPositiveFloat(value), "Invalid Value")
    .transform((v) => parseFloat(v)),
  z.number().min(2).positive(),
]);

const optionalRecordValueSchema = z
  .union([
    z
      .string()
      .refine(
        (value) => (value === "" ? true : isPositiveFloat(value)),
        "Invalid Value"
      )
      .transform((v) => (v === "" ? undefined : parseFloat(v))),
    z.number().min(2).positive().optional(),
  ])
  .optional();

const recordsSchema = z.object({
  weight: recordValueSchema,
  height: recordValueSchema,
  bust: optionalRecordValueSchema,
  waist: optionalRecordValueSchema,
  abdominalGirth: optionalRecordValueSchema,
  hips: optionalRecordValueSchema,
  arm: optionalRecordValueSchema,
  thighs: optionalRecordValueSchema,
  profileId: z.string().cuid(),
});

export type RecordsSchema = z.infer<typeof recordsSchema>;

export default recordsSchema;
