import { ServeType, ServeTypeMap } from "@/type";

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

export const serveOptions: ServeTypeMap = [
  {
    label: "Starch",
    value: "starch",
  },
  {
    label: "Fruit",
    value: "fruit",
  },
  {
    label: "Vegetable",
    value: "vegetable",
  },
  {
    label: "Lean Meat",
    value: "leanMeat",
  },
  {
    label: "Medium Fat Meat",
    value: "mediumMeat",
  },
  {
    label: "High Fat Meat",
    value: "highMeat",
  },
  {
    label: "Low Fat Milk",
    value: "lowFatMilk",
  },
  {
    label: "Medium Fat Milk",
    value: "mediumFatMilk",
  },
  {
    label: "High Fat Milk",
    value: "highFatMilk",
  },
  {
    label: "Sugar",
    value: "sugar",
  },
  {
    label: "Legume",
    value: "legume",
  },
  {
    label: "Unsaturated Fat (MUFA)",
    value: "mufa",
  },
  {
    label: "Unsaturated Fat (PUFA)",
    value: "pufa",
  },
];

export default serves;
