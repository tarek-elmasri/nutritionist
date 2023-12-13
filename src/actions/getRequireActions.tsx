"use server";

import prisma from "@/server/prisma";

const getRequireActions = async () => {
  const profiles = await prisma.profile.findMany({
    where: {
      OR: [
        {
          dietPlans: {
            some: {
              endDate: {
                lte: new Date(),
              },
              active: true,
            },
          },
        },
        {
          dietPlans: {
            none: {},
          },
        },
      ],
    },
    include: {
      dietPlans: {
        orderBy: {
          endDate: "asc",
        },
      },
    },
  });

  return profiles;
};

export default getRequireActions;
