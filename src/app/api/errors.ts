import { ZodError } from "zod";

type FieldError = {
  field: string;
  message: string;
};

export class ValidationError {
  data: FieldError[];
  constructor(errors: FieldError[]) {
    this.data = errors;
  }
}

export const constructZodError = (error: ZodError): FieldError[] =>
  error.issues.map((issue) => ({
    field: issue.path[0] as string,
    message: issue.message,
  }));
