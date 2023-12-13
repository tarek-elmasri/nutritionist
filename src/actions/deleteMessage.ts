"use server";

import prisma from "@/server/prisma";

const deleteMessage = (userId: string, messageId: string) => {
  return prisma.userMessage.update({
    where: {
      recieverId: userId,
      id: messageId,
    },
    data: {
      availableForReciever: false,
    },
  });
};

export const deleteSentMessage = (userId: string, messageId: string) =>
  prisma.userMessage.update({
    where: {
      senderId: userId,
      id: messageId,
    },
    data: {
      availableForSender: false,
    },
  });

export default deleteMessage;
