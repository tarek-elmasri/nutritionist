"use server";

import prisma from "@/lib/prisma";
import { MessageDetails } from "@/type";

export const getMessages = async (
  userId: string
): Promise<MessageDetails[]> => {
  const messages = await prisma.userMessage.findMany({
    where: {
      recieverId: userId,
    },
    include: {
      message: true,
      sender: {
        select: {
          id: true,
          name: true,
          Profile: {
            select: {
              name: true,
            },
          },
        },
      },
    },
    orderBy: {
      message: {
        createdAt: "desc",
      },
    },
  });

  return messages;
};

export const getMessageById = async (
  userId: string,
  id: string
): Promise<MessageDetails | null> => {
  return prisma.userMessage.findFirst({
    where: {
      id,
      recieverId: userId,
    },
    include: {
      message: true,
      sender: {
        select: {
          id: true,
          name: true,
          Profile: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });
};
