import { ZodError } from "zod";

export class UnauthenticatedError extends Error {
  constructor() {
    super("Unauthenticated");
  }
}

export class UnauthorizedError extends Error {
  constructor() {
    super("Unauthorized");
  }
}

export class NotFoundError extends Error {
  constructor() {
    super("Not Found");
  }
}

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
