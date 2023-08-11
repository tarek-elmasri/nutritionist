"use server";

import prisma from "@/lib/prisma";
import foodSchema, { FoodSchema } from "@/lib/validations/food-schema";

const createFood = (item: FoodSchema) => {
  const { amount, label, serveType, unit } = item;
  return prisma.food.create({
    data: {
      label,
      amount,
      serveType,
      unit,
    },
  });
};

export default createFood;
