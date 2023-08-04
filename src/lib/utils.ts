import { type ClassValue, clsx } from "clsx";
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
