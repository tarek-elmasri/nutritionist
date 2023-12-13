"use server";

import prisma from "@/server/prisma";

export const getRecords = async (profileId: string, order?: "asc" | "desc") =>
  prisma.record.findMany({
    where: {
      profileId,
    },
    orderBy: {
      createdAt: order ?? "desc",
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
