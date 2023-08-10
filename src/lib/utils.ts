import { type ClassValue, clsx } from "clsx";
import { format } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isValidPassordPatttern = (password: string) =>
  !password.match(/^(.{0,7}|[^0-9]*|[^A-Z]*|[^a-z]*|[a-zA-Z0-9]*)$/);

export const isPositiveFloat = (num: string) =>
  !isNaN(num as unknown as number) &&
  !isNaN(parseFloat(num)) &&
  parseFloat(num) > 0;

export const calculateAgeFromDOB = (dob: Date) =>
  new Date().getFullYear() - dob.getFullYear();

export const parseDateWithoutTime = (date: Date) => {
  const formattedDate = format(date, "yyyy-MM-dd");
  return new Date(formattedDate);
};
