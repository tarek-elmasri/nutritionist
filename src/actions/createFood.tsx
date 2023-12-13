"use server";

import { type FoodSchema } from "@/lib/validations/food-schema";
import prisma from "@/server/prisma";

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
