"use server";

import prisma from "@/lib/prisma";
import { parseDateWithoutTime } from "@/lib/utils";

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
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getArchivedDietPlans = (profileId: string) =>
  prisma.dietPlan.findMany({
    where: {
      profileId,
      endDate: {
        lt: parseDateWithoutTime(new Date()),
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

export const getDietPlansCount = (profileId: string) =>
  prisma.dietPlan.count({
    where: {
      profileId,
    },
  });
