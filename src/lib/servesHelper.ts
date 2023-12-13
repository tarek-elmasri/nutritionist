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
import type { MealForm, ServePlanForm, ServeType, ServeTypeKey } from "@/type";

export const calculateServeTotals = (serve: ServeType, count: number) => ({
  protien: serve.protien * count,
  CHO: serve.CHO * count,
  fat: serve.fat * count,
  calories: serve.calories * count,
});

/**
 * multiply each serve count and return totals of each serve type
 * @param form ServePlanForm
 */
export const calculateServeTypeTotals = (form: ServePlanForm) => ({
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
export const calculateCategoryTotals = (
  serveTypeTotals: ReturnType<typeof calculateServeTypeTotals>
): ServeType => {
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
};

/**
 * calculates total serves of each type of given meals
 * @param meals MealForm[]
 * @returns ServePlanForm
 */
export const calculateMealsServeCount = (meals: MealForm[]) => {
  const results: ServePlanForm = {
    fruit: 0,
    highFatMilk: 0,
    highMeat: 0,
    leanMeat: 0,
    legume: 0,
    lowFatMilk: 0,
    mediumFatMilk: 0,
    mediumMeat: 0,
    mufa: 0,
    pufa: 0,
    starch: 0,
    sugar: 0,
    vegetable: 0,
  };

  meals.forEach((meal) => {
    meal.contents.forEach(({ amount, item }) => {
      results[item.serveType as ServeTypeKey] += amount;
    });
  });

  return results;
};

export const getTotalsFromServePlan = (servePlan: ServePlanForm) => {
  const serveTypeTotals = calculateServeTypeTotals(servePlan);
  return calculateCategoryTotals(serveTypeTotals);
};
