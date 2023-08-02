import * as z from "zod";
import { isValidPassordPatttern } from "../utils";

export const authSchema = z.object({
  email: z.string().email(),
  password: z.string().refine((value) => isValidPassordPatttern(value), {
    message:
      "Password must be at least of 6 characters, a capital letter, a number and a special character",
  }),
});

export type AuthSchema = z.infer<typeof authSchema>;
