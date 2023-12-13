"use server";

import routes from "@/constants/routes";
import prisma from "@/server/prisma";
import { type MessageSchema } from "@/lib/validations/message-schema";

const createMessage = async (form: MessageSchema) => {
  const { message, senderId, recieverId } = form;

  const userMessage = await prisma.$transaction(async (tx) => {
    // creates message first
    const newMeesage = await tx.message.create({
      data: {
        body: message.body,
        title: message.title,
      },
    });

    // creates the link between users and new message
    const newUserMessage = await tx.userMessage.create({
      data: {
        messageId: newMeesage.id,
        recieverId,
        senderId,
      },
      include: {
        reciever: {
          select: {
            isAdmin: true,
          },
        },
      },
    });

    // creates notification for the reciever

    await tx.notification.create({
      data: {
        href: newUserMessage.reciever!.isAdmin // reciever is already required on creation
          ? routes.consoleInbox
          : routes.userInbox,
        label: "A new message has been recieved.",
        userId: recieverId,
      },
    });

    return newUserMessage;
  });

  return userMessage;
};

export default createMessage;
