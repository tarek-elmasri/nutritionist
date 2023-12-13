"use server";

import prisma from "@/server/prisma";

const updateMessage = (userId: string, messageId: string) => {
  return prisma.userMessage.update({
    where: {
      recieverId: userId,
      id: messageId,
    },
    data: {
      seen: true,
    },
  });
};

export default updateMessage;
