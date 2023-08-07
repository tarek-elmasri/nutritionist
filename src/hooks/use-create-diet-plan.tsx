"use client";

import ProfileCalculator from "@/lib/profile-calculator";
import { ServeType } from "@/type";
import { create } from "zustand";
import {
  freeFatMilkServe,
  fruitServe,
  highFatMilkServe,
  highMeatServe,
  leanMeatServe,
  legumeServe,
  mediumFatMilkServe,
  mediumMeatServe,
  oilServe,
  starchServe,
  sugarServe,
  vegetableServe,
} from "@/constants/serves";

interface ServePlanForm {
  starch: number;
  vegetable: number;
  fruit: number;
  leanMeat: number;
  mediumMeat: number;
  highMeat: number;
  lowFatMilk: number;
  mediumFatMilk: number;
  highFatMilk: number;
  legume: number;
  sugar: number;
  pufa: number;
  mufa: number;
}

const calculateServeTotals = (serve: ServeType, count: number) => ({
  protien: serve.protien * count,
  CHO: serve.CHO * count,
  fat: serve.fat * count,
  calories: serve.calories * count,
});

/**
 * multiply each serve count and return totals of each serve type
 * @param form ServePlanForm
 */
const calculateServeTypeTotals = (form: ServePlanForm) => ({
  starch: calculateServeTotals(starchServe, form.starch),
  fruit: calculateServeTotals(fruitServe, form.fruit),
  vegetable: calculateServeTotals(vegetableServe, form.vegetable),
  leanMeat: calculateServeTotals(leanMeatServe, form.leanMeat),
  mediumMeat: calculateServeTotals(mediumMeatServe, form.mediumMeat),
  highMeat: calculateServeTotals(highMeatServe, form.highMeat),
  lowFatMilk: calculateServeTotals(freeFatMilkServe, form.lowFatMilk),
  mediumFatMilk: calculateServeTotals(mediumFatMilkServe, form.mediumFatMilk),
  highFatMilk: calculateServeTotals(highFatMilkServe, form.highFatMilk),
  legume: calculateServeTotals(legumeServe, form.legume),
  sugar: calculateServeTotals(sugarServe, form.sugar),
  pufa: calculateServeTotals(oilServe, form.pufa),
  mufa: calculateServeTotals(oilServe, form.mufa),
});

/**
 * calculate total calories content for each serve type after multiply counts of serves of a given serve type
 * @returns ServeType
 */
function calculateCategoryTotals(
  serveTypeTotals: ReturnType<typeof calculateServeTypeTotals>
): ServeType {
  const calCategory = (requiredType: keyof ServeType) =>
    Object.keys(serveTypeTotals)
      .map(
        (key) =>
          serveTypeTotals[
            key as unknown as keyof ReturnType<typeof calculateServeTypeTotals>
          ][requiredType]
      )
      .reduce((a, b) => a + b, 0);

  return {
    protien: calCategory("protien"),
    CHO: calCategory("CHO"),
    fat: calCategory("fat"),
    calories: calCategory("calories"),
  };
}

interface UseCreateDietPlanForm {
  profileCalculator?: ProfileCalculator;
  servePlanForm: ServePlanForm;
  serveTypeTotals: ReturnType<typeof calculateServeTypeTotals>;
  categoryTotals: ServeType;
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
}));

export default useCreateDietPlan;
