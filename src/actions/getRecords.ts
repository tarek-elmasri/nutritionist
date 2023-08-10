"use server";

import prisma from "@/lib/prisma";

export const getRecords = async (profileId: string) =>
  prisma.record.findMany({
    where: {
      profileId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

export const getLastRecord = async (profileId: string) =>
  prisma.record.findFirst({
    where: {
      profileId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
