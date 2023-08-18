"use server";

import prisma from "@/lib/prisma";
import { MessageDetails } from "@/type";

export const getMessages = async (
  userId: string
): Promise<MessageDetails[]> => {
  const messages = await prisma.userMessage.findMany({
    where: {
      recieverId: userId,
      availableForReciever: true,
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
      availableForReciever: true,
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

export const getReplyForm = async (messageId: string) => {
  const message = await prisma.message.findFirst({
    where: {
      id: messageId,
    },
  });

  if (!message) return { title: "", body: "" };

  let title: string = "";
  message.title.startsWith("[REPLY]")
    ? (title = message.title)
    : (title = `[REPLY] ${message.title}`);

  const body = `
    

  -----------------------------------
  ${message.body}
  `;

  return { title, body };
};
