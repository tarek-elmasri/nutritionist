"use server";
import prisma from "@/lib/prisma";

export const getProfile = async (userId: string) =>
  await prisma.profile.findFirst({ where: { userId } });
