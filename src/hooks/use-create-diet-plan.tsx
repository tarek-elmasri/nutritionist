"use client";

import type ProfileCalculator from "@/lib/profile-calculator";
import {
  calculateCategoryTotals,
  calculateServeTypeTotals,
} from "@/lib/servesHelper";
import type { MealForm, ServePlanForm, ServeType } from "@/type";
import type { Food } from "@prisma/client";
import { create } from "zustand";

interface UseCreateDietPlanForm {
  schedule: {
    startDate: Date;
    endDate: Date;
  };
  active: boolean;
  profileCalculator?: ProfileCalculator;
  servePlanForm: ServePlanForm;
  serveTypeTotals: ReturnType<typeof calculateServeTypeTotals>;
  categoryTotals: ServeType;
  meals: MealForm[];
  foodList: Food[];
  setFoodList: (list: Food[]) => void;
  setSchedule: (startDate: Date, endDate: Date) => void;
  setMeals: (meals: MealForm[]) => void;
  setProfileCalculator: (calculator: ProfileCalculator) => void;
  setServePlanForm: (form: Partial<ServePlanForm>) => void;
}

const initServePlanForm = {
  starch: 0,
  vegetable: 0,
  fruit: 0,
  leanMeat: 0,
  mediumMeat: 0,
  highMeat: 0,
  lowFatMilk: 0,
  mediumFatMilk: 0,
  highFatMilk: 0,
  legume: 0,
  sugar: 0,
  pufa: 0,
  mufa: 0,
};

const useCreateDietPlan = create<UseCreateDietPlanForm>((set) => ({
  schedule: {
    startDate: new Date(),
    endDate: new Date(Date.now() + 12096e5), // two weeks from now
  },
  active: true,
  profileCalculator: undefined,
  servePlanForm: initServePlanForm,
  meals: [],
  foodList: [],
  serveTypeTotals: calculateServeTypeTotals(initServePlanForm),
  categoryTotals: calculateCategoryTotals(
    calculateServeTypeTotals(initServePlanForm)
  ),
  setSchedule: (startDate, endDate) =>
    set((state) => ({ ...state, schedule: { startDate, endDate } })),
  setProfileCalculator: (calculator) =>
    set((state) => ({ ...state, profileCalculator: calculator })),
  setServePlanForm: (form) =>
    set((state) => {
      const newForm = { ...state.servePlanForm, ...form };
      const serveTypeTotals = calculateServeTypeTotals(newForm);
      const categoryTotals = calculateCategoryTotals(serveTypeTotals);
      return {
        ...state,
        servePlanForm: newForm,
        serveTypeTotals,
        categoryTotals,
      };
    }),
  setMeals: (meals) => set((state) => ({ ...state, meals })),
  setFoodList: (foodList) => set((state) => ({ ...state, foodList })),
}));

export default useCreateDietPlan;
