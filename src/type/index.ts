import { serves } from "@/constants";
import { leanMeatServe } from "@/constants/serves";
import { Food, Meal, MealItem, ServePlan } from "@prisma/client";
import { User } from "next-auth";

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    isAdmin: boolean;
  }
}

declare module "next-auth" {
  interface Session {
    user: User & {
      isAdmin: boolean;
      id: string;
    };
  }
}

export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
}

export enum Goal {
  LOSE_WEIGHT = "LOSE_WEIGHT",
  GAIN_WEIGHT = "GAIN_WEIGHT",
  MAINTAIN_WEIGHT = "MAINTAIN_WEIGHT",
  BUILD_MUSCLES = "BUILD_MUSCLES",
}

export enum ActivityLevel {
  LOW = "LOW",
  MEDIUM = "Moderate",
  HIGH = "HIGH",
}

export type IdealZone = {
  min: number;
  max: number;
};

export enum WeightCategory {
  DANGEROUS_OBESE = "Dangerous Obese",
  CRITICAL_OBESE = "Critical Obese",
  OBESE = "Obese",
  OVER_WEIGHT = "Over Weight",
  NORMAL = "Normal",
  UNDER_WEIGHT = "Under Weight",
  SEVERELY_UNDER_WEIGHT = "Severely Under Weight",
}

export interface ServeType {
  CHO: number;
  protien: number;
  fat: number;
  calories: number;
}

export type ServePlanForm = Omit<ServePlan, "id" | "dietPlanId">;
// export interface ServePlanForm {
//   starch: number;
//   vegetable: number;
//   fruit: number;
//   leanMeat: number;
//   mediumMeat: number;
//   highMeat: number;
//   lowFatMilk: number;
//   mediumFatMilk: number;
//   highFatMilk: number;
//   legume: number;
//   sugar: number;
//   pufa: number;
//   mufa: number;
// }

export type MealItemForm = Omit<MealItem, "id" | "mealId"> & { item: Food };
export type MealForm = Omit<Meal, "id" | "dietPlanId"> & {
  contents: MealItemForm[];
};

export type ServeTypeKey = keyof ServePlanForm;
// export type ServeTypeMap = Record<ServeTypeKey, ServeType>;
export type ServeTypeMap = { label: string; value: ServeTypeKey }[];

export type TableFilterKeys<TData> = {
  accessorKey: keyof TData;
  label: string;
}[];
