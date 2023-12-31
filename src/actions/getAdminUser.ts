"use server";

import prisma from "@/lib/prisma";

const getAdminUserId = async () => {
  const user = await prisma.user.findFirst({
    where: { isAdmin: true },
    select: { id: true },
  });
  return user?.id;
};

export default getAdminUserId;
