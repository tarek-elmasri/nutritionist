"use server";

import prisma from "@/server/prisma";

export const getProfile = async (userId: string) => {
  try {
    const profile = await prisma.profile.findFirst({
      where: { userId },
      include: {
        records: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });
    return profile;
  } catch (error) {
    return null;
  }
};

export const getProfileById = async (profileId: string) => {
  try {
    const profile = prisma.profile.findFirst({
      where: { id: profileId },
      include: {
        records: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });
    return profile;
  } catch (error) {
    return null;
  }
};

export const getProfiles = async () => {
  try {
    const profiles = await prisma.profile.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return profiles;
  } catch (error) {
    return [];
  }
};
