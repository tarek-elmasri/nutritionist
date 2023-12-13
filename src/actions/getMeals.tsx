"use server";

import prisma from "@/server/prisma";

export const getMeals = (userId: string, dietPlanId: string) => {
  return prisma.meal.findMany({
    where: {
      dietPlan: {
        id: dietPlanId,
        profile: {
          userId,
        },
      },
    },
    include: {
      contents: {
        include: {
          item: true,
        },
      },
    },
    orderBy: {
      order: "asc",
    },
  });
};
