"use server";

import prisma from "@/server/prisma";
import type { MessageDetails, SentMessageDetails } from "@/type";

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

export const getMessageById = async (userId: string, id: string) => {
  return prisma.userMessage.findFirst({
    where: {
      id,
      OR: [
        { recieverId: userId, availableForReciever: true },
        { senderId: userId, availableForSender: true },
      ],
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
      reciever: {
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

  let title = "";
  message.title.startsWith("[REPLY]")
    ? (title = message.title)
    : (title = `[REPLY] ${message.title}`);

  const body = `
    

  -----------------------------------
  ${message.body}
  `;

  return { title, body };
};

export const getSentMessages = async (
  userId: string
): Promise<SentMessageDetails[]> => {
  const messages = await prisma.userMessage.findMany({
    where: {
      senderId: userId,
      availableForSender: true,
    },
    include: {
      message: true,
      reciever: {
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

// export const getSentMessageById = async (
//   userId: string,
//   id: string
// ): Promise<SentMessageDetails | null> => {
//   return prisma.userMessage.findFirst({
//     where: {
//       id,
//       senderId: userId,
//       availableForSender: true,
//     },
//     include: {
//       message: true,
//       reciever: {
//         select: {
//           id: true,
//           name: true,
//           Profile: {
//             select: {
//               name: true,
//             },
//           },
//         },
//       },
//     },
//   });
// };
