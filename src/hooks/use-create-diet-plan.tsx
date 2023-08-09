"use client";

import ProfileCalculator from "@/lib/profile-calculator";
import {
  calculateCategoryTotals,
  calculateServeTypeTotals,
} from "@/lib/servesHelper";
import { MealForm, ServePlanForm, ServeType } from "@/type";
import { create } from "zustand";

interface UseCreateDietPlanForm {
  profileCalculator?: ProfileCalculator;
  servePlanForm: ServePlanForm;
  serveTypeTotals: ReturnType<typeof calculateServeTypeTotals>;
  categoryTotals: ServeType;
  meals: MealForm[];
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
  profileCalculator: undefined,
  servePlanForm: initServePlanForm,
  meals: [],
  serveTypeTotals: calculateServeTypeTotals(initServePlanForm),
  categoryTotals: calculateCategoryTotals(
    calculateServeTypeTotals(initServePlanForm)
  ),
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
}));

export default useCreateDietPlan;
