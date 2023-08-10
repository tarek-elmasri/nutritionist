"use server";

import prisma from "@/lib/prisma";

export const getProfile = async (userId: string) =>
  await prisma.profile.findFirst({
    where: { userId },
    include: {
      records: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

export const getProfileById = async (profileId: string) =>
  prisma.profile.findFirst({
    where: { id: profileId },
    include: {
      records: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

export const getProfiles = async () =>
  await prisma.profile.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
