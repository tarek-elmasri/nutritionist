"use server";

import prisma from "@/lib/prisma";

export const getActiveDietPlans = (profileId: string) => {
  return prisma.dietPlan.findMany({
    where: {
      profileId,
      startDate: {
        lte: new Date(),
      },
      endDate: {
        gte: new Date(),
      },
    },
  });
};
