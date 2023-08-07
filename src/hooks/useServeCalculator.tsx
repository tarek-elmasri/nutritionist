// "use client";

// import {
//   freeFatMilkServe,
//   fruitServe,
//   highMeatServe,
//   leanMeatServe,
//   mediumMeatServe,
//   vegetableServe,
//   mediumFatMilkServe,
//   highFatMilkServe,
//   legumeServe,
//   sugarServe,
//   oilServe,
//   starchServe,
// } from "@/constants/serves";
// import { ServeType } from "@/type";
// import { create } from "zustand";

// interface ServePlanForm {
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

// // const calculateServeTotals = (serve: ServeType, count: number) => ({
// //   protien: serve.protien * count,
// //   CHO: serve.CHO * count,
// //   fat: serve.fat * count,
// //   calories: serve.calories * count
// // });

// // const calculateServeTypeTotals = (form: ServePlanForm) => ({
// //   starch: calculateServeTotals(starchServe, form.starch),
// //   fruit: calculateServeTotals(fruitServe, form.fruit),
// //   vegetable: calculateServeTotals(vegetableServe, form.vegetable),
// //   leanMeat: calculateServeTotals(leanMeatServe, form.leanMeat),
// //   mediumMeat: calculateServeTotals(mediumMeatServe, form.mediumMeat),
// //   highMeat: calculateServeTotals(highMeatServe, form.highMeat),
// //   lowFatMilk: calculateServeTotals(freeFatMilkServe, form.lowFatMilk),
// //   mediumFatMilk: calculateServeTotals(mediumFatMilkServe, form.mediumFatMilk),
// //   highFatMilk: calculateServeTotals(highFatMilkServe, form.highFatMilk),
// //   legume: calculateServeTotals(legumeServe, form.legume),
// //   sugar: calculateServeTotals(sugarServe, form.sugar),
// //   pufa: calculateServeTotals(oilServe, form.pufa),
// //   mufa: calculateServeTotals(oilServe, form.mufa)
// // });

// // const calculateCategoryTotals = (
// //   serveTypeTotals: ReturnType<typeof calculateServeTypeTotals>
// // ) => {
// //   const calCategory = (requiredType: keyof ServeType) =>
// //     Object.keys(serveTypeTotals)
// //       .map(
// //         (key) =>
// //           serveTypeTotals[
// //             key as unknown as keyof ReturnType<typeof calculateServeTypeTotals>
// //           ][requiredType]
// //       )
// //       .reduce((a, b) => a + b, 0);

// //   return {
// //     protien: calCategory('protien'),
// //     CHO: calCategory('CHO'),
// //     fat: calCategory('fat'),
// //     calories: calCategory('calories')
// //   };
// // };

// interface UseServeCalculatorProps {
//   form: ServePlanForm;
//   setForm: (form: Partial<ServePlanForm>) => void;
// }

// const useServeCalculator = create<>;

// // const useServeCalculator = (servePlan?: ServePlanForm) => {
// //   const initState: ServePlanForm = servePlan || {
// //     starch: 0,
// //     fruit: 0,
// //     vegetable: 0,
// //     leanMeat: 0,
// //     mediumMeat: 0,
// //     highMeat: 0,
// //     lowFatMilk: 0,
// //     mediumFatMilk: 0,
// //     highFatMilk: 0,
// //     legume: 0,
// //     sugar: 0,
// //     pufa: 0,
// //     mufa: 0
// //   };

// //   const [form, setForm] = useState(initState);
// //   const [serveTypesTotals, setServeTypesTotals] = useState(
// //     calculateServeTypeTotals(form)
// //   );
// //   const [totals, setTotals] = useState(
// //     calculateCategoryTotals(serveTypesTotals)
// //   );
// //   const register = (fieldName: keyof ServePlanForm) => ({
// //     name: fieldName,
// //     onChange: handleChange
// //   });

// //   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     const { value, name } = e.target;
// //     const newState = { ...form, [name]: value };
// //     setForm(newState);
// //     setServeTypesTotals(calculateServeTypeTotals(newState));
// //     setTotals(calculateCategoryTotals(calculateServeTypeTotals(newState)));
// //   };

// //   return {
// //     register,
// //     form,
// //     serveTypesTotals,
// //     totals
// //   };
// // };

// // export default useServeCalculator;
