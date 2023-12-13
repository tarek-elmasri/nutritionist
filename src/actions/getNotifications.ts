"use server";

import prisma from "@/server/prisma";
import getCurrentUser from "./get CurrentUser";

export const getNotifications = async (limit = 10, offset?: number) => {
  const currentUser = await getCurrentUser();

  if (!currentUser)
    return { notifications: [], hasMore: false, newNotificationsCount: 0 };

  const notifications = await prisma.notification.findMany({
    where: {
      userId: currentUser.id,
    },
    take: limit + 1,
    skip: offset,
    orderBy: {
      createdAt: "desc",
    },
  });

  const newNotificationsCount = await prisma.notification.count({
    where: {
      userId: currentUser.id,
      seen: false,
    },
  });

  const hasMore = notifications.length === limit + 1;
  if (hasMore) notifications.pop();

  return {
    newNotificationsCount,
    notifications,
    hasMore,
  };
};
