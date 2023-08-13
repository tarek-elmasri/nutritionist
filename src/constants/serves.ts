import { ServeType, ServeTypeKey, ServeTypeMap } from "@/type";

export const fruitServe: ServeType = {
  CHO: 15,
  protien: 0,
  fat: 0,
  calories: 60,
};

export const legumeServe: ServeType = {
  CHO: 15,
  protien: 7,
  fat: 0,
  calories: 110,
};

export const leanMeatServe: ServeType = {
  CHO: 0,
  protien: 7,
  fat: 3,
  calories: 45,
};

export const mediumMeatServe: ServeType = {
  CHO: 0,
  protien: 7,
  fat: 5,
  calories: 75,
};

export const highMeatServe: ServeType = {
  CHO: 0,
  protien: 7,
  fat: 8,
  calories: 100,
};

export const freeFatMilkServe: ServeType = {
  CHO: 15,
  protien: 8,
  fat: 3,
  calories: 100,
};

export const mediumFatMilkServe: ServeType = {
  CHO: 15,
  protien: 8,
  fat: 5,
  calories: 120,
};

export const highFatMilkServe: ServeType = {
  CHO: 15,
  protien: 8,
  fat: 8,
  calories: 150,
};

export const starchServe: ServeType = {
  CHO: 15,
  protien: 3,
  fat: 0,
  calories: 80,
};

export const vegetableServe: ServeType = {
  CHO: 5,
  protien: 2,
  fat: 0,
  calories: 25,
};

export const sugarServe: ServeType = {
  CHO: 15,
  protien: 0,
  fat: 0,
  calories: 60,
};

export const oilServe: ServeType = {
  CHO: 0,
  protien: 0,
  fat: 5,
  calories: 45,
};

const serves = {
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
};

export const serveLabels: Record<ServeTypeKey, string> = {
  fruit: "Fruit",
  starch: "Starch",
  vegetable: "Vegetable",
  leanMeat: "Lean Meet",
  mediumMeat: "Medium Fat Meet",
  highMeat: "High Fat Meet",
  lowFatMilk: "Low Fat Milk",
  mediumFatMilk: "Medium Fat Milk",
  highFatMilk: "High Fat Milk",
  legume: "Legume",
  sugar: "Sugar",
  pufa: "Unsaturated Fat (PUFA)",
  mufa: "Unsaturated Fat (MUFA)",
};

export const serveOptions: ServeTypeMap = [
  {
    label: serveLabels["starch"],
    value: "starch",
  },
  {
    label: serveLabels["fruit"],
    value: "fruit",
  },
  {
    label: serveLabels["vegetable"],
    value: "vegetable",
  },
  {
    label: serveLabels["leanMeat"],
    value: "leanMeat",
  },
  {
    label: serveLabels["mediumMeat"],
    value: "mediumMeat",
  },
  {
    label: serveLabels["highMeat"],
    value: "highMeat",
  },
  {
    label: serveLabels["lowFatMilk"],
    value: "lowFatMilk",
  },
  {
    label: serveLabels["mediumFatMilk"],
    value: "mediumFatMilk",
  },
  {
    label: serveLabels["highFatMilk"],
    value: "highFatMilk",
  },
  {
    label: serveLabels["sugar"],
    value: "sugar",
  },
  {
    label: serveLabels["legume"],
    value: "legume",
  },
  {
    label: serveLabels["mufa"],
    value: "mufa",
  },
  {
    label: serveLabels["pufa"],
    value: "pufa",
  },
];

export default serves;
