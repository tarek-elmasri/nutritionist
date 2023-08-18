"use server";

import prisma from "@/lib/prisma";

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

export default deleteMessage;
