"use server";

import prisma from "@/server/prisma";
import getCurrentUser from "./get CurrentUser";

const updateNotification = async (id: string) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) return null;
  return prisma.notification.update({
    where: {
      id,
      userId: currentUser.id,
    },
    data: {
      seen: true,
    },
  });
};

export default updateNotification;
